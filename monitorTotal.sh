#!/bin/bash

ip="5.8.8.8" # ip on private network

total=`curl -X POST $ip/?optType=ReadRealTimeData | jq '.Data[8]'`
date=`date +%s`

echo $total
echo "$date,$total" >> log.csv
