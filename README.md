# Monitor Server
## Description

Monitor server is a wrapper for [systeminfonmation](https://systeminformation.io/gettingstarted.html) for NestJS application that provides a REST API for monitoring server status, like CPU usage, memory usage and disk space.

### Start server with docker

```bash
docker pull rtugeek/monitor-server
docker run -d -p 3000:3000 rtugeek/monitor-server
```

### IMPORTANT!

The **token** must be included in the request header or query parameters; otherwise, the request will fail authentication.

Token is generated when the server starts, you can see it in the console log.

```shell
...
[Nest] LOG [NestApplication] Nest application successfully started +1ms
[Nest] LOG [APP] Server port: 3000
[Nest] LOG [APP] Add the follow token to http request header or search params
[Nest] LOG [APP] ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
[Nest] LOG [APP] sjq2eqcob0irqvs7rm21oxh8zh9zp1ya 👈 token is here
[Nest] LOG [APP] ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
[Nest] LOG [APP] Open http://localhost:3000/api to see the api doc
```

### Request Example

View Api Doc at http://localhost:3000/api
![Swagger UI](img.png)

```http request
GET http://localhost:3000/os?token=sjq2eqcob0irqvs7rm21oxh8zh9zp1ya
```

### Reset token

```http request
GET http://localhost:3000/token?newToken=your_new_token&token=old_token
```