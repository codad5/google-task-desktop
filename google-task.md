REST Resource: tasks
Methods
clear	POST /tasks/v1/lists/{tasklist}/clear
Clears all completed tasks from the specified task list.
delete	DELETE /tasks/v1/lists/{tasklist}/tasks/{task}
Deletes the specified task from the task list.
get	GET /tasks/v1/lists/{tasklist}/tasks/{task}
Returns the specified task.
insert	POST /tasks/v1/lists/{tasklist}/tasks
Creates a new task on the specified task list.
list	GET /tasks/v1/lists/{tasklist}/tasks
Returns all tasks in the specified task list.
move	POST /tasks/v1/lists/{tasklist}/tasks/{task}/move
Moves the specified task to another position in the destination task list.
patch	PATCH /tasks/v1/lists/{tasklist}/tasks/{task}
Updates the specified task.
update	PUT /tasks/v1/lists/{tasklist}/tasks/{task}
Updates the specified task.


Skip to main content
Google Workspace
Workspace
Home
Google Tasks
All products

Resources

Search
/

English

Google Tasks
Overview
Guides
Reference
Support
Filter

Home
Google Workspace
Google Tasks
Reference
Send feedbackGoogle Tasks API

bookmark_border
The Google Tasks API lets you manage your tasks and task lists.

Service: tasks.googleapis.com
To call this service, we recommend that you use the Google-provided client libraries. If your application needs to use your own libraries to call this service, use the following information when you make the API requests.

Discovery document
A Discovery Document is a machine-readable specification for describing and consuming REST APIs. It is used to build client libraries, IDE plugins, and other tools that interact with Google APIs. One service may provide multiple discovery documents. This service provides the following discovery document:

https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest
Service endpoint
A service endpoint is a base URL that specifies the network address of an API service. One service might have multiple service endpoints. This service has the following service endpoint and all URIs below are relative to this service endpoint:

https://tasks.googleapis.com
REST Resource: tasklists
Methods
delete	DELETE /tasks/v1/users/@me/lists/{tasklist}
Deletes the authenticated user's specified task list.
get	GET /tasks/v1/users/@me/lists/{tasklist}
Returns the authenticated user's specified task list.
insert	POST /tasks/v1/users/@me/lists
Creates a new task list and adds it to the authenticated user's task lists.
list	GET /tasks/v1/users/@me/lists
Returns all the authenticated user's task lists.
patch	PATCH /tasks/v1/users/@me/lists/{tasklist}
Updates the authenticated user's specified task list.
update	PUT /tasks/v1/users/@me/lists/{tasklist}
Updates the authenticated user's specified task list.
REST Resource: tasks
Methods
clear	POST /tasks/v1/lists/{tasklist}/clear
Clears all completed tasks from the specified task list.
delete	DELETE /tasks/v1/lists/{tasklist}/tasks/{task}
Deletes the specified task from the task list.
get	GET /tasks/v1/lists/{tasklist}/tasks/{task}
Returns the specified task.
insert	POST /tasks/v1/lists/{tasklist}/tasks
Creates a new task on the specified task list.
list	GET /tasks/v1/lists/{tasklist}/tasks
Returns all tasks in the specified task list.
move	POST /tasks/v1/lists/{tasklist}/tasks/{task}/move
Moves the specified task to another position in the destination task list.
patch	PATCH /tasks/v1/lists/{tasklist}/tasks/{task}
Updates the specified task.
update	PUT /tasks/v1/lists/{tasklist}/tasks/{task}
Updates the specified task.
Send feedback
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-03-13 UTC.

BlogBlog
Read the Google Workspace Developers blog
Stack OverviewStack Overview
Ask questions with the google-tasks tag
file_download
Client libraries
Download a client library for your preferred language
Google Workspace for Developers
Platform overview
Developer products
Release notes
Developer support
Terms of Service
Tools
Admin console
Apps Script Dashboard
Google Cloud console
APIs Explorer
Connect
Blog
Newsletter
X (Twitter)
YouTube
Google Developers
Android
Chrome
Firebase
Google Cloud Platform
Google AI
All products
Terms
Privacy

English
The new page has loaded..



Skip to main content
Google Workspace
Workspace
Home
Google Tasks
All products

Resources

Search
/

English

Google Tasks
Overview
Guides
Reference
Support
Filter

Home
Google Workspace
Google Tasks
Reference
Send feedbackMethod: tasks.clear

bookmark_border
Clears all completed tasks from the specified task list. The affected tasks will be marked as 'hidden' and no longer be returned by default when retrieving all tasks for a task list.

HTTP request
POST https://tasks.googleapis.com/tasks/v1/lists/{tasklist}/clear

The URL uses gRPC Transcoding syntax.

Path parameters
Parameters
tasklist	
string

Task list identifier.

Request body
The request body must be empty.

Response body
If successful, the response body is empty.

Authorization scopes
Requires the following OAuth scope:

https://www.googleapis.com/auth/tasks
For more information, see the Authorization guide.

Send feedback
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-03-13 UTC.

BlogBlog
Read the Google Workspace Developers blog
Stack OverviewStack Overview
Ask questions with the google-tasks tag
file_download
Client libraries
Download a client library for your preferred language
Google Workspace for Developers
Platform overview
Developer products
Release notes
Developer support
Terms of Service
Tools
Admin console
Apps Script Dashboard
Google Cloud console
APIs Explorer
Connect
Blog
Newsletter
X (Twitter)
YouTube
Google Developers
Android
Chrome
Firebase
Google Cloud Platform
Google AI
All products
Terms
Privacy

English
The new page has loaded..

Skip to main content
Google Workspace
Workspace
Home
Google Tasks
All products

Resources

Search
/

English

Google Tasks
Overview
Guides
Reference
Support
Filter

Home
Google Workspace
Google Tasks
Reference
Send feedbackMethod: tasks.delete

bookmark_border
Deletes the specified task from the task list. If the task is assigned, both the assigned task and the original task (in Docs, Chat Spaces) are deleted. To delete the assigned task only, navigate to the assignment surface and unassign the task from there.

HTTP request
DELETE https://tasks.googleapis.com/tasks/v1/lists/{tasklist}/tasks/{task}

The URL uses gRPC Transcoding syntax.

Path parameters
Parameters
tasklist	
string

Task list identifier.

task	
string

Task identifier.

Request body
The request body must be empty.

Response body
If successful, the response body is empty.

Authorization scopes
Requires the following OAuth scope:

https://www.googleapis.com/auth/tasks
For more information, see the Authorization guide.

Send feedback
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-03-13 UTC.

BlogBlog
Read the Google Workspace Developers blog
Stack OverviewStack Overview
Ask questions with the google-tasks tag
file_download
Client libraries
Download a client library for your preferred language
Google Workspace for Developers
Platform overview
Developer products
Release notes
Developer support
Terms of Service
Tools
Admin console
Apps Script Dashboard
Google Cloud console
APIs Explorer
Connect
Blog
Newsletter
X (Twitter)
YouTube
Google Developers
Android
Chrome
Firebase
Google Cloud Platform
Google AI
All products
Terms
Privacy

English
The new page has loaded.

Skip to main content
Google Workspace
Workspace
Home
Google Tasks
All products

Resources

Search
/

English

Google Tasks
Overview
Guides
Reference
Support
Filter

Home
Google Workspace
Google Tasks
Reference
Send feedbackMethod: tasks.get

bookmark_border
Returns the specified task.

HTTP request
GET https://tasks.googleapis.com/tasks/v1/lists/{tasklist}/tasks/{task}

The URL uses gRPC Transcoding syntax.

Path parameters
Parameters
tasklist	
string

Task list identifier.

task	
string

Task identifier.

Request body
The request body must be empty.

Response body
If successful, the response body contains an instance of Task.

Authorization scopes
Requires one of the following OAuth scopes:

https://www.googleapis.com/auth/tasks
https://www.googleapis.com/auth/tasks.readonly
For more information, see the Authorization guide.

Send feedback
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-03-13 UTC.

BlogBlog
Read the Google Workspace Developers blog
Stack OverviewStack Overview
Ask questions with the google-tasks tag
file_download
Client libraries
Download a client library for your preferred language
Google Workspace for Developers
Platform overview
Developer products
Release notes
Developer support
Terms of Service
Tools
Admin console
Apps Script Dashboard
Google Cloud console
APIs Explorer
Connect
Blog
Newsletter
X (Twitter)
YouTube
Google Developers
Android
Chrome
Firebase
Google Cloud Platform
Google AI
All products
Terms
Privacy

English
Copied to clipboard
The new page has loaded..


Skip to main content
Google Workspace
Workspace
Home
Google Tasks
All products

Resources

Search
/

English

Google Tasks
Overview
Guides
Reference
Support
Filter

Home
Google Workspace
Google Tasks
Reference
Send feedbackMethod: tasks.insert

bookmark_border
Creates a new task on the specified task list. Tasks assigned from Docs or Chat Spaces cannot be inserted from Tasks Public API; they can only be created by assigning them from Docs or Chat Spaces. A user can have up to 20,000 non-hidden tasks per list and up to 100,000 tasks in total at a time.

HTTP request
POST https://tasks.googleapis.com/tasks/v1/lists/{tasklist}/tasks

The URL uses gRPC Transcoding syntax.

Path parameters
Parameters
tasklist	
string

Task list identifier.

Query parameters
Parameters
parent	
string

Parent task identifier. If the task is created at the top level, this parameter is omitted. An assigned task cannot be a parent task, nor can it have a parent. Setting the parent to an assigned task results in failure of the request. Optional.

previous	
string

Previous sibling task identifier. If the task is created at the first position among its siblings, this parameter is omitted. Optional.

Request body
The request body contains an instance of Task.

Response body
If successful, the response body contains a newly created instance of Task.

Authorization scopes
Requires the following OAuth scope:

https://www.googleapis.com/auth/tasks
For more information, see the Authorization guide.

Send feedback
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-03-13 UTC.

BlogBlog
Read the Google Workspace Developers blog
Stack OverviewStack Overview
Ask questions with the google-tasks tag
file_download
Client libraries
Download a client library for your preferred language
Google Workspace for Developers
Platform overview
Developer products
Release notes
Developer support
Terms of Service
Tools
Admin console
Apps Script Dashboard
Google Cloud console
APIs Explorer
Connect
Blog
Newsletter
X (Twitter)
YouTube
Google Developers
Android
Chrome
Firebase
Google Cloud Platform
Google AI
All products
Terms
Privacy

English
The new page has loaded.


Skip to main content
Google Workspace
Workspace
Home
Google Tasks
All products

Resources

Search
/

English

Google Tasks
Overview
Guides
Reference
Support
Filter

Home
Google Workspace
Google Tasks
Reference
Send feedbackMethod: tasks.list

bookmark_border


Returns all tasks in the specified task list. Doesn't return assigned tasks by default (from Docs, Chat Spaces). A user can have up to 20,000 non-hidden tasks per list and up to 100,000 tasks in total at a time.

HTTP request
GET https://tasks.googleapis.com/tasks/v1/lists/{tasklist}/tasks

The URL uses gRPC Transcoding syntax.

Path parameters
Parameters
tasklist	
string

Task list identifier.

Query parameters
Parameters
completedMax	
string

Upper bound for a task's completion date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by completion date.

completedMin	
string

Lower bound for a task's completion date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by completion date.

dueMax	
string

Upper bound for a task's due date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by due date.

dueMin	
string

Lower bound for a task's due date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by due date.

maxResults	
integer

Maximum number of tasks returned on one page. Optional. The default is 20 (max allowed: 100).

pageToken	
string

Token specifying the result page to return. Optional.

showCompleted	
boolean

Flag indicating whether completed tasks are returned in the result. Note that showHidden must also be True to show tasks completed in first party clients, such as the web UI and Google's mobile apps. Optional. The default is True.

showDeleted	
boolean

Flag indicating whether deleted tasks are returned in the result. Optional. The default is False.

showHidden	
boolean

Flag indicating whether hidden tasks are returned in the result. Optional. The default is False.

updatedMin	
string

Lower bound for a task's last modification time (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by last modification time.

showAssigned	
boolean

Optional. Flag indicating whether tasks assigned to the current user are returned in the result. Optional. The default is False.

Request body
The request body must be empty.

Response body
If successful, the response body contains data with the following structure:

JSON representation
{
  "kind": string,
  "etag": string,
  "nextPageToken": string,
  "items": [
    {
      object (Task)
    }
  ]
}
Fields
kind	
string

Type of the resource. This is always "tasks#tasks".

etag	
string

ETag of the resource.

nextPageToken	
string

Token used to access the next page of this result.

items[]	
object (Task)

Collection of tasks.

Authorization scopes
Requires one of the following OAuth scopes:

https://www.googleapis.com/auth/tasks
https://www.googleapis.com/auth/tasks.readonly
For more information, see the Authorization guide.

Tasks
JSON representation
{
  "kind": string,
  "etag": string,
  "nextPageToken": string,
  "items": [
    {
      object (Task)
    }
  ]
}
Fields
kind	
string

Type of the resource. This is always "tasks#tasks".

etag	
string

ETag of the resource.

nextPageToken	
string

Token used to access the next page of this result.

items[]	
object (Task)

Collection of tasks.

Send feedback
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-04-10 UTC.

BlogBlog
Read the Google Workspace Developers blog
Stack OverviewStack Overview
Ask questions with the google-tasks tag
file_download
Client libraries
Download a client library for your preferred language
Google Workspace for Developers
Platform overview
Developer products
Release notes
Developer support
Terms of Service
Tools
Admin console
Apps Script Dashboard
Google Cloud console
APIs Explorer
Connect
Blog
Newsletter
X (Twitter)
YouTube
Google Developers
Android
Chrome
Firebase
Google Cloud Platform
Google AI
All products
Terms
Privacy

English
The new page has loaded..


Skip to main content
Google Workspace
Workspace
Home
Google Tasks
All products

Resources

Search
/

English

Google Tasks
Overview
Guides
Reference
Support
Filter

Home
Google Workspace
Google Tasks
Reference
Was this helpful?

Send feedbackMethod: tasks.move

bookmark_border
Moves the specified task to another position in the destination task list. If the destination list is not specified, the task is moved within its current list. This can include putting it as a child task under a new parent and/or move it to a different position among its sibling tasks. A user can have up to 2,000 subtasks per task.

HTTP request
POST https://tasks.googleapis.com/tasks/v1/lists/{tasklist}/tasks/{task}/move

The URL uses gRPC Transcoding syntax.

Path parameters
Parameters
tasklist	
string

Task list identifier.

task	
string

Task identifier.

Query parameters
Parameters
parent	
string

Optional. New parent task identifier. If the task is moved to the top level, this parameter is omitted. The task set as parent must exist in the task list and can not be hidden.

Exceptions: 1. Assigned and repeating tasks cannot be set as parent tasks (have subtasks), or be moved under a parent task (become subtasks). 2. Tasks that are both completed and hidden cannot be nested, so the parent field must be empty.

previous	
string

Optional. New previous sibling task identifier. If the task is moved to the first position among its siblings, this parameter is omitted. The task set as previous must exist in the task list and can not be hidden.

Exceptions: 1. Tasks that are both completed and hidden can only be moved to position 0, so the previous field must be empty.

destinationTasklist	
string

Optional. Destination task list identifier. If set, the task is moved from tasklist to the destinationTasklist list. Otherwise the task is moved within its current list. Recurrent tasks cannot currently be moved between lists.

Request body
The request body must be empty.

Response body
If successful, the response body contains an instance of Task.

Authorization scopes
Requires the following OAuth scope:

https://www.googleapis.com/auth/tasks
For more information, see the Authorization guide.

Was this helpful?

Send feedback
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-05-13 UTC.

BlogBlog
Read the Google Workspace Developers blog
Stack OverviewStack Overview
Ask questions with the google-tasks tag
file_download
Client libraries
Download a client library for your preferred language
Google Workspace for Developers
Platform overview
Developer products
Release notes
Developer support
Terms of Service
Tools
Admin console
Apps Script Dashboard
Google Cloud console
APIs Explorer
Connect
Blog
Newsletter
X (Twitter)
YouTube
Google Developers
Android
Chrome
Firebase
Google Cloud Platform
Google AI
All products
Terms
Privacy

English
The new page has loaded.


Skip to main content
Google Workspace
Workspace
Home
Google Tasks
All products

Resources

Search
/

English

Google Tasks
Overview
Guides
Reference
Support
Filter

Home
Google Workspace
Google Tasks
Reference
Was this helpful?

Send feedbackMethod: tasks.patch

bookmark_border
Updates the specified task. This method supports patch semantics.

HTTP request
PATCH https://tasks.googleapis.com/tasks/v1/lists/{tasklist}/tasks/{task}

The URL uses gRPC Transcoding syntax.

Path parameters
Parameters
tasklist	
string

Task list identifier.

task	
string

Task identifier.

Request body
The request body contains an instance of Task.

Response body
If successful, the response body contains an instance of Task.

Authorization scopes
Requires the following OAuth scope:

https://www.googleapis.com/auth/tasks
For more information, see the Authorization guide.

Was this helpful?

Send feedback
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-03-13 UTC.

BlogBlog
Read the Google Workspace Developers blog
Stack OverviewStack Overview
Ask questions with the google-tasks tag
file_download
Client libraries
Download a client library for your preferred language
Google Workspace for Developers
Platform overview
Developer products
Release notes
Developer support
Terms of Service
Tools
Admin console
Apps Script Dashboard
Google Cloud console
APIs Explorer
Connect
Blog
Newsletter
X (Twitter)
YouTube
Google Developers
Android
Chrome
Firebase
Google Cloud Platform
Google AI
All products
Terms
Privacy

English
The new page has loaded..


Skip to main content
Google Workspace
Workspace
Home
Google Tasks
All products

Resources

Search
/

English

Google Tasks
Overview
Guides
Reference
Support
Filter

Home
Google Workspace
Google Tasks
Reference
Send feedbackMethod: tasks.update

bookmark_border
Updates the specified task.

HTTP request
PUT https://tasks.googleapis.com/tasks/v1/lists/{tasklist}/tasks/{task}

The URL uses gRPC Transcoding syntax.

Path parameters
Parameters
tasklist	
string

Task list identifier.

task	
string

Task identifier.

Request body
The request body contains an instance of Task.

Response body
If successful, the response body contains an instance of Task.

Authorization scopes
Requires the following OAuth scope:

https://www.googleapis.com/auth/tasks
For more information, see the Authorization guide.

Send feedback
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-03-13 UTC.

BlogBlog
Read the Google Workspace Developers blog
Stack OverviewStack Overview
Ask questions with the google-tasks tag
file_download
Client libraries
Download a client library for your preferred language
Google Workspace for Developers
Platform overview
Developer products
Release notes
Developer support
Terms of Service
Tools
Admin console
Apps Script Dashboard
Google Cloud console
APIs Explorer
Connect
Blog
Newsletter
X (Twitter)
YouTube
Google Developers
Android
Chrome
Firebase
Google Cloud Platform
Google AI
All products
Terms
Privacy

English
The new page has loaded.