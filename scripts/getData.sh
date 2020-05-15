#!/bin/bash

ip="5.8.8.8" # ip on private network

power=$(curl -s -X POST $ip/?optType=ReadRealTimeData | jq '.Data[6]')

echo "${power}W"
