# Todo Summary Service

A Spring Boot application that uses AI to summarize your todo list and sends the summary to Slack.

## Features

-  CRUD operations for todos
-  AI-powered summarization using OpenAI GPT
-  Slack integration with rich formatting
-  RESTful API endpoints
-  Detailed logging and error handling

## Prerequisites

- Java 17 or later
- PostgreSQL database
- OpenAI/Cohere API key
- Slack workspace with webhook access

## Setup Instructions

### 1. Database Setup

Create a PostgreSQL database and user:

```sql
-- Connect as postgres user
sudo -u postgres psql

-- Create database and user
CREATE DATABASE todo_db;
CREATE USER todo WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE todo_db TO todo;

-- Connect to the database
\c todo_db

-- Create schema for the todo user
CREATE SCHEMA todo_schema AUTHORIZATION todo;
GRANT ALL ON SCHEMA todo_schema TO todo;
```

### 2. OpenAI API Key Setup

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-...`)

### 3. Slack Webhook Setup

#### Step-by-step Slack configuration:

1. **Go to Slack API**: Visit https://api.slack.com/apps
2. **Create New App**: 
   - Click "Create New App"
   - Choose "From scratch"
   - App Name: "Todo Summary Bot"
   - Select your workspace
3. **Enable Incoming Webhooks**:
   - Go to "Incoming Webhooks" in the left sidebar
   - Toggle "Activate Incoming Webhooks" to **ON**
4. **Add Webhook to Workspace**:
   - Click "Add New Webhook to Workspace"
   - Select the channel where you want summaries posted
   - Click "Allow"
5. **Copy Webhook URL**: 
   - Copy the webhook URL (looks like: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`)

### 4. Application Configuration

Update `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/todo_db
spring.datasource.username=todo
spring.datasource.password=your_secure_password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.default_schema=todo_schema

# OpenAI Configuration
openai.api.key=sk-your_openai_api_key_here

# Slack Configuration
slack.webhook.url=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
```

### 5. Environment Variables (Recommended for Production)

Instead of hardcoding sensitive information, use environment variables:

```bash
export OPENAI_API_KEY="sk-your_openai_api_key_here"
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
export DB_PASSWORD="your_secure_password"
```

Update application.properties:
```properties
openai.api.key=${OPENAI_API_KEY}
slack.webhook.url=${SLACK_WEBHOOK_URL}
spring.datasource.password=${DB_PASSWORD}
```

## Running the Application

1. **Clone and build**:
   ```bash
   git clone <your-repo>
   cd todo-summary-service
   ./mvnw clean install
   ```

2. **Run the application**:
   ```bash
   ./mvnw spring-boot:run
   ```

3. **Test the setup**:
   ```bash
   # Test Slack connection
   curl -X POST http://localhost:8080/api/test/slack
   
   # Check configuration status
   curl http://localhost:8080/api/config/status
   ```

## API Endpoints

### Todo Management
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/{id}` - Update a todo
- `DELETE /api/todos/{id}` - Delete a todo

### Summary & Slack Integration
- `POST /api/summarize` - Generate AI summary and send to Slack
- `POST /api/summarize/pending-only` - Summarize only pending todos
- `POST /api/test/slack` - Test Slack connection
- `GET /api/config/status` - Check service configuration

## Usage Examples

### 1. Create some todos:
```bash
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Complete project documentation", "completed": false}'

curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Review pull requests", "completed": true}'
```

### 2. Generate and send summary:
```bash
curl -X POST http://localhost:8080/api/summarize
```

## Troubleshooting

### Common Issues:

1. **Database Connection Issues**:
   - Verify PostgreSQL is running: `sudo systemctl status postgresql`
   - Check if the database and user exist
   - Verify connection string and credentials

2. **OpenAI API Issues**:
   - Verify your API key is correct and has credits
   - Check the API key format (should start with `sk-`)
   - Ensure you have access to GPT-3.5-turbo model

3. **Slack Integration Issues**:
   - Verify webhook URL is correct and complete
   - Check if the Slack app has proper permissions
   - Test with the `/api/test/slack` endpoint

4. **Schema Permission Issues**:
   - Make sure the `todo_schema` exists and user has permissions
   - Check the `spring.jpa.properties.hibernate.default_schema` setting

### Debug Mode:
Enable debug logging in application.properties:
```properties
logging.level.com.todo_summary_backend=DEBUG
logging.level.org.springframework.web.client.RestTemplate=DEBUG
```

## Security Notes

- Never commit API keys or webhooks to version control
- Use environment variables for sensitive configuration
- Consider using Spring Boot's configuration encryption for production
- Regularly rotate your API keys
