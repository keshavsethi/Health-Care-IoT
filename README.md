https://health-care-iot-534c9.web.app/     
https://youtu.be/GL4sibIDw7A

Hardware- We have used NodeMcu (ESP8266) as our MicroController. With it we have integrated a Pulse Oximeter Sensor(MAX30100) which provides us with the BPM and SpO2 levels of the User  and a Temperature Sensor (MLX90614) to read his/her temperature.

Code- Once the values of BPM, SpO2 and Temperature are received from the sensors, they are converted into strings and pushed onto our firebase along with the date and the time at which the given readings were received. 

Backend: Here we have used Firebase which is a platform used for cloud storage, database management and hosting. Nodemcu is integrated with the firebase library and data of sensors are pushed into the database which we have created in firebase. All this data in firebase gets updated in real time and it creates api for users and we can use that to integrate with our frontend.

Frontend: Here we have used Bootstrap for design, Datatables for tables, plotly for charts and firebase to integrate with the backend. Our major focus is on analysis and Alerting Users. For Analysis we have used  Ploty for line and pie charts to analyse data distribution. Datatables are used to get tabular data as it supports sorting,  searching and better UI. Apart from this we have also integrated our web app with a chatbot to provide answers to faqs and we can make it more intelligent in future. For alert we have used smtp mailing api which sends alerts whenever temperature/pulse crosses predefined threshold and emails comes to the email id of the user. A chrome notification also comes along with email. This dashboard is fully responsive and it can be accessed from any device. It also supports multi-user if more hardware is used. It is scalable and more data fields can be added if required. These Apis can be used in mobile apps as well. This Dashboard is fully secured, hosted and supports all browsers.  

Note: Please visit URLs mentioned above
