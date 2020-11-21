#include <ESP8266WiFi.h>                                     
#include <FirebaseArduino.h> 
#include <NTPClient.h>
#include <WiFiUdp.h>
#define FIREBASE_HOST "health-care-iot-534c9.firebaseio.com"                      
#define FIREBASE_AUTH "8GaxVgThl2pqejQZd9BspxR195FrGR4Be9Fea81j"
#include <Adafruit_MLX90614.h>
#include <Wire.h>
#include "MAX30100_PulseOximeter.h"
#define BLYNK_PRINT Serial
#include <Blynk.h>
#include <BlynkSimpleEsp8266.h> 
#include "Wire.h"
#include "Adafruit_GFX.h"
#define REPORTING_PERIOD_MS 1000
WiFiUDP ntpUDP;
Adafruit_MLX90614 mlx = Adafruit_MLX90614();
NTPClient timeClient(ntpUDP, "pool.ntp.org");
char auth[] = "7XKuoYqDvkugZs1I-0Pcunz0rZYkMiu_";             // You should get Auth Token in the Blynk App.
char ssid[] = "JioFiber-uuQkp";                                     // Your WiFi credentials.
char pass[] = "sarthak07";
 // Connections : SCL PIN - D1 , SDA PIN - D2 , INT PIN - D0
PulseOximeter pox;
 
float BPM, SpO2;
uint32_t tsLastReport = 0;
 
void onBeatDetected()
{
    Serial.println("Beat Detected!");
}
String weekDays[7]={"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

//Month names
String months[12]={"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};
void setup() {
  Serial.begin(115200);
  mlx.begin(); 
  delay(1000);                
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);     
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("Connected to ");
  Serial.println(WIFI_SSID);
  Serial.print("IP Address is : ");
  Serial.println(WiFi.localIP());                                     
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);                              
  Serial.begin(115200);
    pinMode(16, OUTPUT);
    Blynk.begin(auth, ssid, pass);
 
    Serial.print("Initializing Pulse Oximeter..");
    timeClient.begin();
    timeClient.setTimeOffset(19800);

 
    // The default current for the IR LED is 50mA and it could be changed by uncommenting the following line.
     //pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);                                                        
}
void loop(){
  timeClient.update();

  unsigned long epochTime = timeClient.getEpochTime();
  
  String formattedTime = timeClient.getFormattedTime();
  Serial.print("Formatted Time: ");
  Serial.println(formattedTime);  

  int currentHour = timeClient.getHours();  
  int currentMinute = timeClient.getMinutes();
   
  int currentSecond = timeClient.getSeconds();

  String weekDay = weekDays[timeClient.getDay()]; 

  //Get a time structure
  struct tm *ptm = gmtime ((time_t *)&epochTime); 

  int monthDay = ptm->tm_mday;

  int currentMonth = ptm->tm_mon+1;

  String currentMonthName = months[currentMonth-1];

  int currentYear = ptm->tm_year+1900;
  String currentDate = String(currentYear) + "-" + String(currentMonth) + "-" + String(monthDay);
  Serial.print("Current date: ");
  Serial.println(currentDate);
  if (!pox.begin())
    {
         Serial.println("FAILED");
         for(;;);
    }
    else
    {
         Serial.println("SUCCESS");
         pox.setOnBeatDetectedCallback(onBeatDetected);
           pox.update();
    Blynk.run();
 
    BPM = pox.getHeartRate();
    SpO2 = pox.getSpO2();
        Serial.print("Heart rate:");
        Serial.print(BPM);
        Serial.print(" bpm / SpO2:");
        Serial.print(SpO2);
        Serial.println(" %");
    }
 
        Blynk.virtualWrite(V7, BPM);
        Blynk.virtualWrite(V8, SpO2);
    float Temp = mlx.readObjectTempC();         
    Serial.print("temperature = ");
    Serial.print(Temp); 
    Serial.println("C  ");

  String B = String(BPM);
  String Sp= String(SpO2);
  String T = String(Temp);
  Firebase.pushString("/data/pulse", B); 
  Firebase.pushString("/data/oxygen", Sp); 
  Firebase.pushString("/data/temp", T);
  Firebase.pushString("/data/time", formattedTime);
  Firebase.pushString("/data/date", currentDate);

  delay(2000);
  }
