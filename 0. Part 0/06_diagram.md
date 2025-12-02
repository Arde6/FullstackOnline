```mermaid
sequenceDiagram
    participant browser
    participant user
    participant server

    user-->>browser: type text to textfield
    user-->>browser: click save
    activate browser
    browser-->>server: POST new_note_spa
```