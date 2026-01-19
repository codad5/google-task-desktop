/**
 * Settings Dialog
 * 
 * App-wide settings configuration.
 */

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import { Close, Notifications } from '@mui/icons-material';
import {
  loadSettings,
  saveSettings,
  getNotificationHourOptions,
  formatHour,
  AppSettings,
} from '../../services/settings.service';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  onSettingsChange?: (settings: AppSettings) => void;
}

export default function SettingsDialog({ 
  open, 
  onClose,
  onSettingsChange,
}: SettingsDialogProps) {
  const [notificationHour, setNotificationHour] = useState<number>(9);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load settings when dialog opens
  useEffect(() => {
    if (open) {
      loadSettings()
        .then(settings => {
          setNotificationHour(settings.notificationHour);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [open]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await saveSettings({ notificationHour });
      onSettingsChange?.(updated);
      onClose();
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const hourOptions = getNotificationHourOptions();

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Settings</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          sx={{ color: 'text.secondary' }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ pt: 3 }}>
        {loading ? (
          <Typography color="text.secondary">Loading...</Typography>
        ) : (
          <Box>
            {/* Notifications Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Notifications color="primary" />
              <Typography variant="subtitle1" fontWeight={600}>
                Notifications
              </Typography>
            </Box>
            
            <FormControl fullWidth size="small">
              <InputLabel id="notification-hour-label">Remind me at</InputLabel>
              <Select
                labelId="notification-hour-label"
                value={notificationHour}
                label="Remind me at"
                onChange={(e) => setNotificationHour(e.target.value as number)}
              >
                {hourOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ display: 'block', mt: 1 }}
            >
              Notifications will be sent at {formatHour(notificationHour)} on the task's due date.
            </Typography>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSave}
          disabled={loading || saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
