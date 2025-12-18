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
Upgrade to premium dialog opened



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

Send feedbackREST Resource: tasklists

bookmark_border


Resource: TaskList
JSON representation

{
  "kind": string,
  "id": string,
  "etag": string,
  "title": string,
  "updated": string,
  "selfLink": string
}
Fields
kind	
string

Output only. Type of the resource. This is always "tasks#taskList".

id	
string

Task list identifier.

etag	
string

ETag of the resource.

title	
string

Title of the task list. Maximum length allowed: 1024 characters.

updated	
string

Output only. Last modification time of the task list (as a RFC 3339 timestamp).

selfLink	
string

Output only. URL pointing to this task list. Used to retrieve, update, or delete this task list.

Methods
delete
Deletes the authenticated user's specified task list.
get
Returns the authenticated user's specified task list.
insert
Creates a new task list and adds it to the authenticated user's task lists.
list
Returns all the authenticated user's task lists.
patch
Updates the authenticated user's specified task list.
update
Updates the authenticated user's specified task list.
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
Was this helpful?

Send feedbackMethod: tasklists.get

bookmark_border
Returns the authenticated user's specified task list.

HTTP request
GET https://tasks.googleapis.com/tasks/v1/users/@me/lists/{tasklist}

The URL uses gRPC Transcoding syntax.

Path parameters
Parameters
tasklist	
string

Task list identifier.

Request body
The request body must be empty.

Response body
If successful, the response body contains an instance of TaskList.

Authorization scopes
Requires one of the following OAuth scopes:

https://www.googleapis.com/auth/tasks
https://www.googleapis.com/auth/tasks.readonly
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

Send feedbackMethod: tasklists.delete

bookmark_border
Deletes the authenticated user's specified task list. If the list contains assigned tasks, both the assigned tasks and the original tasks in the assignment surface (Docs, Chat Spaces) are deleted.

HTTP request
DELETE https://tasks.googleapis.com/tasks/v1/users/@me/lists/{tasklist}

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
Was this helpful?

Send feedbackMethod: tasklists.update

bookmark_border
Updates the authenticated user's specified task list.

HTTP request
PUT https://tasks.googleapis.com/tasks/v1/users/@me/lists/{tasklist}

The URL uses gRPC Transcoding syntax.

Path parameters
Parameters
tasklist	
string

Task list identifier.

Request body
The request body contains an instance of TaskList.

Response body
If successful, the response body contains an instance of TaskList.

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

Send feedbackRequestBatch

bookmark_border
A batch of requests to Execute.

JSON representation

{
  "name": string,
  "requests": [
    {
      object (Request)
    }
  ]
}
Fields
name	
string

The name of the resource this request is for. Some Batch implementations may require a batch to be for only a single resource, for example a single database.

requests[]	
object (Request)

The requests contained in this batch.

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
Was this helpful?

Send feedbackRequest

bookmark_border
A request message sent as part of a batch execution.

JSON representation

{
  "requestId": string,
  "methodName": string,
  "request": {
    "@type": string,
    field1: ...,
    ...
  },
  "extensions": [
    {
      "@type": string,
      field1: ...,
      ...
    }
  ]
}
Fields
requestId	
string

Unique id of this request within the batch. The Response message with a matching requestId is the response to this request. For request-streaming methods, the same requestId may be used multiple times to pass all request messages that are part of a single method. For response-streaming methods, the same requestId may show up in multiple Response messages.

methodName	
string

The method being called. Must be a fully qualified method name. Example: google.rpc.batch.Batch.Execute

request	
object

The request payload.

An object containing fields of an arbitrary type. An additional field "@type" contains a URI identifying the type. Example: { "id": 1234, "@type": "types.example.com/standard/id" }.

extensions[]	
object

Application specific request metadata.

An object containing fields of an arbitrary type. An additional field "@type" contains a URI identifying the type. Example: { "id": 1234, "@type": "types.example.com/standard/id" }.

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
Send feedbackMethod: tasklists.patch

bookmark_border
Updates the authenticated user's specified task list. This method supports patch semantics.

HTTP request
PATCH https://tasks.googleapis.com/tasks/v1/users/@me/lists/{tasklist}

The URL uses gRPC Transcoding syntax.

Path parameters
Parameters
tasklist	
string

Task list identifier.

Request body
The request body contains an instance of TaskList.

Response body
If successful, the response body contains an instance of TaskList.

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