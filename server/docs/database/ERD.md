Certainly! Below is an extended version of the ERD with a brief description of each table and its columns, along with examples where applicable:

# Entity-Relationship Diagram (ERD)

## Users Management

### Users

- **id (PK):** Primary Key for the Users table.
- **email:** User's email address for communication and login.
- **username:** Unique username for identification.
- **password:** User's password for authentication.
- **deleted_at:** Timestamp indicating when the user was deleted (nullable).
- **created_at:** Timestamp of user creation.
- **updated_at:** Timestamp of the last update.

**Purpose:** Stores information about system users, including their authentication details and timestamps.

### Roles

- **id (PK):** Primary Key for the Roles table.
- **name:** Unique name for the role.
- **description:** Description of the role's purpose.
- **status:** Status of the role (e.g., active, inactive).
- **type:** Type of the role (e.g., admin, user).
- **created_at:** Timestamp of role creation.
- **updated_at:** Timestamp of the last update.

**Purpose:** Defines roles within the system for role-based access control (RBAC).

### UserRoles `(Junction)`

- **id (PK):** Primary Key for the UserRoles table.
- **user_id (FK):** Foreign Key referencing the Users table.
- **role_id (FK):** Foreign Key referencing the Roles table.
- **timestamps:** Timestamps for record creation and updates.

**Purpose:** Establishes a many-to-many relationship between users and roles.

### Group

- **id (PK):** Primary Key for the Group table.
- **name:** Unique name for the group.
- **description:** Description of the group's purpose.
- **created_at:** Timestamp of group creation.
- **updated_at:** Timestamp of the last update.

**Purpose:** Defines groups for organizing users and roles.

### GroupUsers `(Junction)`

- **id (PK):** Primary Key for the GroupUsers table.
- **user_id (FK):** Foreign Key referencing the Users table.
- **group_id (FK):** Foreign Key referencing the Group table.
- **created_at:** Timestamp of association creation.
- **updated_at:** Timestamp of the last update.

**Purpose:** Establishes a many-to-many relationship between groups and users.

### GroupRoles `(Junction)`

- **id (PK):** Primary Key for the GroupRoles table.
- **group_id (FK):** Foreign Key referencing the Group table.
- **role_id (FK):** Foreign Key referencing the Roles table.
- **created_at:** Timestamp of association creation.
- **updated_at:** Timestamp of the last update.

**Purpose:** Establishes a many-to-many relationship between groups and roles.

### Module

- **id (PK):** Primary Key for the Module table.
- **module_key:** Unique identifier for the module.
- **ar_name:** Arabic name of the module.
- **en_name:** English name of the module.
- **source:** Source or origin of the module.
- **parent_module_id (FK):** Foreign Key referencing the parent Module.
- **created_at:** Timestamp of module creation.
- **updated_at:** Timestamp of the last update.

**Purpose:** Represents different modules or sections of the system, allowing for hierarchical organization.

### Entity

- **id (PK):** Primary Key for the Entity table.
- **entity_key:** Unique identifier for the entity.
- **entity_url:** URL or reference to the entity.
- **ar_name:** Arabic name of the entity.
- **en_name:** English name of the entity.
- **module_id (FK):** Foreign Key referencing the Module table.
- **order:** Order or position of the entity within its module.
- **created_at:** Timestamp of entity creation.
- **updated_at:** Timestamp of the last update.

**Purpose:** Represents entities within modules, enabling structured organization of features.

### EntityAction

- **id (PK):** Primary Key for the EntityAction table.
- **action_key:** Unique identifier for the action.
- **en_name:** English name of the action.
- **ar_name:** Arabic name of the action.
- **entity_id (FK):** Foreign Key referencing the Entity table.
- **action_category:** Category of the action (e.g., CRUD operations).
- **created_at:** Timestamp of action creation.
- **updated_at:** Timestamp of the last update.

**Purpose:** Defines actions that can be performed within entities, facilitating granular access control.

### UserEntityAction `(Junction)`

- **id (PK):** Primary Key for the UserEntityAction table.
- **user_id (FK):** Foreign Key referencing the Users table.
- **action_id (FK):** Foreign Key referencing the EntityAction table.
- **created_at:** Timestamp of association creation.
- **updated_at:** Timestamp of the last update.

**Purpose:** Links users to specific actions with context-based controls.

### RoleEntityActions `(Junction)`

- **id (PK):** Primary Key for the RoleEntityActions table.
- **role_id (FK):** Foreign Key referencing the Roles table.
- **action_id (FK):** Foreign Key referencing the EntityAction table.
- **created_at:** Timestamp of association creation.
- **updated_at:** Timestamp of the last update.

**Purpose:** Links roles to specific actions with context-based controls.
