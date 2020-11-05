const config = {
    apiKey: "AIzaSyCqOdIjUsNL95Uc00JBmhUWgHXtWCtNTLU",
    authDomain: "health-care-iot-534c9.firebaseapp.com",
    databaseURL: "https://health-care-iot-534c9.firebaseio.com",
    projectId: "health-care-iot-534c9",
    storageBucket: "health-care-iot-534c9.appspot.com",
    messagingSenderId: "214130811754",
    appId: "1:214130811754:web:a15dbec4a135da9b3d7b13",
    measurementId: "G-3ZLX17QWM7"
  };
  firebase.initializeApp(config);
  

    
  console.log("check");
  firebase.database().ref('data/test').on('value', ts_measures => {
    let values = [];
    let ids = [];
    ts_measures.forEach(ts_measure => {
    values.push(ts_measure.val());
    });
    for(i=1;i<=values.length;i++){
        ids[i]=i;
    }
    console.log(values);
    let len = values.length;
    console.log(values[len-1] );
    if(values[len-1] > 100){
        console.log("email check");
        Email.send({ 
            Host: "smtp.gmail.com", 
            Username: "healthcare.group8@gmail.com", 
            Password: "keshavsethi", 
            To: 'keshav.sethi0004@gmail.com', 
            From: "healthcare.group8@gmail.com", 
            Subject: "Alert!!", 
            Body: "Hope you are well, your temptature crossed thershold value, Please check!!", 
        });

    }
    // Get a reference to the DOM node that welcomes the plot drawn by Plotly.js:
    myPlotDiv = document.getElementById('myPlot');
  
    // We generate x and y data necessited by Plotly.js to draw the plot
    // and its layout information as well:
    // See https://plot.ly/javascript/getting-started/
    const data = [{
        x: ids,
        y: values
    }];
  
    const layout = {
        xaxis: {
            linecolor: 'black',
            linewidth: 2
        },
        yaxis: {
            title: 'Temprature',
            titlefont: {
                family: 'Times New Roman',
                size: 14,
                color: '#000'
            },
            linecolor: 'black',
            linewidth: 2,
        },
        margin: {
            r: 50,
            pad: 0
        }
    }
    // At last we plot data :-)
    Plotly.newPlot(myPlotDiv, data, layout, { responsive: true });
  });