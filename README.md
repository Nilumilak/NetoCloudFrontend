![CI](https://github.com/Nilumilak/NetoCloudFrontend/actions/workflows/cicd.yml/badge.svg)

![Alt text](assets/NetoCloudLogo.png)
# NetoCloud
## Description
Cloud storage where you can store your files, download and use their links to put in other 
services. The design is made using the antd library.

Backend - https://github.com/Nilumilak/NetoCloudBackend<br />
Frontend - https://github.com/Nilumilak/NetoCloudFrontend

## Toolset
- React
- Redux, Redux Saga
- Ant Design
- Zod
- Vite
- Eslint

## Build & Deployment
- Configure .env file
  - create .env file in the root directory (where the package.json is located)
  - Configure variables:
    - VITE_SERVER_URL=http://\<server ip address>/backend/api/v1/
    - VITE_SERVER_BASE_URL=http://\<server ip address>/backend
- npm run build
- Do deployment steps from https://github.com/Nilumilak/NetoCloudBackend
- Connect to the server through ssh
- sudo chmod 707 /usr/share/nginx/html
- sudo chmod 707 /usr/share/nginx/html/index.html
- Disconnect from the server
- scp -r dist/* \<server user>@\<server ip address>:/usr/share/nginx/html
