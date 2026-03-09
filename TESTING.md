# Testing Checklist (Project1)

## Manual Smoke Tests
1. Start server: `npm start`
2. Open `http://localhost:3000`
3. Submit valid form -> success status shown
4. Submit invalid email -> validation error shown
5. Open `http://localhost:3000/admin.html`
6. Load leads and verify latest record appears

## API Tests
```bash
curl http://localhost:3000/api/health

curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo","email":"demo@example.com","message":"Hello"}'

curl http://localhost:3000/api/messages
```

If `ADMIN_TOKEN` is set:
```bash
curl http://localhost:3000/api/messages -H "x-admin-token: <YOUR_TOKEN>"
```
