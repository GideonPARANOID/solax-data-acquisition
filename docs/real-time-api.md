# Real Time API

Mappings decyphered [here](https://community.home-assistant.io/t/solax-solar-inverter-setup-guide/48008).

```
{
  type: "",   // dongle description
  SN: "----", // serial number
  ver: "2.xx", // version
  Data: [
    0,  // pv1 current
    1,  // pv2 current
    2,  // pv1 voltage
    3,  // pv2 voltage
    4,  // grid current
    5,  // grid voltage
    6,  // grid power
    7,  // inner temperature
    8,  // solar today
    9,  // solar total
    10, // feed in power
    11, // pv1 power
    12, // pv2 power
    13, // battery voltage
    14, // battery current
    15, // battery power
    16, // battery temperature
    17,
    18, // battery capacity
    19, // solar total 2
    20,
    21,
    22,
    23,
    24
    25,
    26,
    27
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41, // energy to grid
    42, // energy from grid
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50, // grid frequency
    51,
    52,
    53, // eps voltage
    54, // eps current
    55, // eps va
    56, // eps frequency
    57,
    58,
    59,
    60,
    61
    62,
    63,
    64,
    65,
    66,
    67,
    68, // status
  ],
  "Information": [
    0,
    1,
    3, // invertor name/
    4, // invertor code
    5,
    6, // system max?
    7,
    8,
    9,
  ]
}

   ```
Live datastream

