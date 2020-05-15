#!/bin/bash

ip="5.8.8.8" # ip on private network

curl -X POST $ip/?optType=ReadRealTimeData
