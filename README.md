# Lab 12 Final Project

This project contains two applications:

- A two-member personal website
- A Todo application with add, complete, and delete features

Each application has its own Dockerfile. Docker Compose runs both applications, and GitHub Actions automatically deploys them to the server through SSH.

## Team Members

| Member | Student ID | Photo | Main Contribution | Contribution |
| --- | --- | --- | --- | --- |
| LiuHuanchu | 20242198 | ![LiuHuanchu](personal-website/assets/member-1.jpg) | Personal website, README, and documentation | 50% |
| YingJiakang | 20242191 | ![YingJiakang](personal-website/assets/member-2.jpg) | Docker, Docker Compose, GitHub Actions, and server deployment | 50% |

## Application URLs

| Application | Local URL | Server URL |
| --- | --- | --- |
| Personal Website | http://localhost:8081 | http://18.234.211.25:8081 |
| Todo Application | http://localhost:8082 | http://18.234.211.25:8082 |

## Project Structure

```text
lab12-final-project/
├── personal-website/
├── todo-app/
├── .github/workflows/deploy.yml
├── Dockerfile
├── todo.Dockerfile
├── docker-compose.yml
└── README.md
```

## Run Locally

Docker and Docker Compose are required.

```bash
git clone https://github.com/Augestermini/lab12-final-project.git
cd lab12-final-project
docker compose up -d --build
docker ps
```

To stop both applications:

```bash
docker compose down
```

## Automatic Deployment

The workflow at `.github/workflows/deploy.yml` runs after a push to the `main` branch. It connects to the server through SSH, pulls the latest code, rebuilds both applications, and starts the containers.

The following GitHub Actions secrets are required:

| Secret | Description |
| --- | --- |
| `SERVER_USER` | SSH username |
| `SERVER_SSH_KEY` | SSH private key |

The server must have Git, Docker, and Docker Compose installed. Ports `8081` and `8082` must be open.

## Verification

```bash
docker compose up -d --build
docker ps
```

After deployment, open the two server URLs listed above and verify that both applications are available.
