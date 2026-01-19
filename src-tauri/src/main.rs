// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod libs;

use specta::collect_types;
use tauri_plugin_log::LogTarget;
use tauri_specta::ts;

use libs::filehelper::ENV_FILE;
use libs::notifications::{
    cancel_notification, get_notification_count, schedule_notification, NotificationScheduler,
};
use libs::tauri_actions::{
    greet, load_access_token, load_code, save_access_token, save_code, test_command,
};

fn run_specta() {
    println!("Running specta to generate typescript bindings");

    #[cfg(debug_assertions)]
    ts::export(
        collect_types![
            save_access_token,
            load_access_token,
            greet,
            test_command,
            save_code,
            load_code,
        ],
        "../src/helpers/commands.ts",
    )
    .expect("Failed to export typescript bindings");
}

fn main() {
    dotenv::from_filename(ENV_FILE).ok();
    run_specta();

    // Create notification scheduler
    let notification_scheduler = NotificationScheduler::default();

    tauri::Builder::default()
        .manage(notification_scheduler)
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            println!(
                "from single instance {}, {argv:?}, {cwd}",
                app.package_info().name
            );
        }))
        .plugin(tauri_plugin_context_menu::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_oauth::init())
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            save_access_token,
            load_access_token,
            greet,
            test_command,
            save_code,
            load_code,
            // Notification commands
            schedule_notification,
            cancel_notification,
            get_notification_count,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
