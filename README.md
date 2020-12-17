# webvr gateball 
building virtual reality experiences with Aframe
<img src="https://user-images.githubusercontent.com/37530599/102524382-42a4a000-40dc-11eb-8b62-9b1fbeac043f.png" width="80%"></img>
<br></br>

## architecture
a-frame framework <br>
three.js api
<br></br>

## infra
<img src="https://user-images.githubusercontent.com/37530599/102524036-c01be080-40db-11eb-95e2-631e062430ec.png" width="80%"></img><br>
live-server
pm2
nginx
ec2 instance
<br></br>

## Deploy
1. clone this repository in your ec2 instance or server 
```
git clone https://github.com/CSID-DGU/2020-1-CECD2-HwangToGol-2.git 
```

2. start live-server
```
live-server http 3500
```

3. pm2 start
```
pm2 start /usr/bin/live-server --port 3500
```

4. apply nginx & ssl 
```
sudo vi /etc/nginx/sites-available/default
```
```
## /etc/nginx/sites-available/default 파일 아래 처럼 수정

server{
listen 443 ssl default_server;
listen [::]:443 ssl default_server;
ssl_certificate /etc/letsencrypt/live/{ssl 인증서 발급시 도메인명}.ml/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/{ssl 인증서 발급시 도메인명}.ml/privkey.pem;
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_ciphers HIGH:!aNULL:!MD5;
listen 80;

location /{
        proxy_pass http://127.0.0.1:3500;
}
}
```


**Enjoy Gateball In WebVR**<br>
<img src="https://user-images.githubusercontent.com/37530599/102524134-e2adf980-40db-11eb-9979-c271161fcbb6.png" width="80%"></img>


* live server 띄우는 법
https://blog.naver.com/hl2ozs/221910095122
