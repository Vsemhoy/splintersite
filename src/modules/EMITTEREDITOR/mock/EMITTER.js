export const MOCK_SPEAKER = {
  "id": "JBL_VTX_A12",
  "name": "JBL VTX A12",
  "type": "professional",
  "manufacturer": "JBL",
  "description": "Line array loudspeaker with constant directivity horn",
  "patterns": {
    "horizontal": {
      "1000Hz": [0, -0.4, -0.8, ..., -0.4],
      "4000Hz": [0, -0.5, -1.6, ..., -0.5]
    },
    "vertical": {
      "1000Hz": [0, -0.4, -0.8, ..., -0.4],
      "4000Hz": [0, -0.5, -1.6, ..., -0.5]
    }
  },
  "frequency_response": {
    "sensitivity": 90,
    "min_frequency": 50,
    "max_frequency": 20000,
    "response_curve": [
      {"frequency": 63, "value": -6},
      {"frequency": 125, "value": -4},
      {"frequency": 250, "value": -2},
      {"frequency": 500, "value": -1},
      {"frequency": 1000, "value": 0},
      {"frequency": 2000, "value": +1},
      {"frequency": 4000, "value": -2},
      {"frequency": 8000, "value": -5},
      {"frequency": 16000, "value": -9}
    ]
  },
  "physical": {
    "size": {
      "width": 0.12,
      "height": 0.67,
      "depth": 0.4
    },
    "weight_kg": 22.5,
    "mounting_type": "line_array"
  },
  "version": "1.0",
  "creator": "vsemhoy",
}

export const MOCK_STAGE_SPEAKER = {
  "id": "Custom_Stage_Speaker",
  "name": "Stage Speaker v1",
  "type": "stage",
  "manufacturer": "None",
  "patterns": {
    "horizontal": {
      "1000Hz": [0, -0.4, -0.8, -1.2, -1.6, -1.9, -2.3, -2.7, -3.1, -3.5, -3.9, -5, -6.8, -7.7, -8, -7.4, -6.2, -5, -5, -5, -6.2, -7.4, -8, -7.7, -6.8, -5, -3.9, -3.5, -3.1, -2.7, -2.3, -1.9, -1.6, -1.2, -0.8, -0.4],
      "4000Hz": [0, -0.5, -1.6, -2.9, -5.2, -7.1, -8.9, -10.8, -12.6, -14.4, -15.7, -17.1, -18.4, -19.8, -21.1, -17.8, -21.2, -22.7, -15, -22.7, -21.2, -17.8, -21.1, -19.8, -18.4, -17.1, -15.7, -14.4, -12.6, -10.8, -8.9, -7.1, -5.2, -2.9, -1.6, -0.5]
    },
    "vertical": {
      "1000Hz": [0, -0.4, -0.8, -1.2, -1.6, -1.9, -2.3, -2.7, -3.1, -3.5, -3.9, -5, -6.8, -7.7, -8, -7.4, -6.2, -5, -5, -5, -6.2, -7.4, -8, -7.7, -6.8, -5, -3.9, -3.5, -3.1, -2.7, -2.3, -1.9, -1.6, -1.2, -0.8, -0.4],
      "4000Hz": [0, -0.5, -1.6, -2.9, -5.2, -7.1, -8.9, -10.8, -12.6, -14.4, -15.7, -17.1, -18.4, -19.8, -21.1, -17.8, -21.2, -22.7, -15, -22.7, -21.2, -17.8, -21.1, -19.8, -18.4, -17.1, -15.7, -14.4, -12.6, -10.8, -8.9, -7.1, -5.2, -2.9, -1.6, -0.5]
    }
  },
  "frequency_response": {
    "sensitivity": 90,
    "min_frequency": 50,
    "max_frequency": 20000,
    "response_curve": [
      {"frequency": 63, "value": -6},
      {"frequency": 125, "value": -4},
      {"frequency": 250, "value": -2},
      {"frequency": 500, "value": -1},
      {"frequency": 1000, "value": 0},
      {"frequency": 2000, "value": 1},
      {"frequency": 4000, "value": -2},
      {"frequency": 8000, "value": -5},
      {"frequency": 16000, "value": -9}
    ]
  },
  "physical": {
    "size": {
      "width": 0.12,
      "height": 0.67,
      "depth": 0.4
    },
    "weight_kg": 22.5,
    "mounting_type": "line_array"
  },
  "version": "1.0"
}

export const MOCK_FR = {
  "frequency_response": {
    "sensitivity": 90,
    "response_curve": [
      {"frequency": 63, "value": -6},
      {"frequency": 125, "value": -4},
      {"frequency": 250, "value": -2},
      {"frequency": 500, "value": -1},
      {"frequency": 1000, "value": 0},
      {"frequency": 1500, "value": +1},
      {"frequency": 2000, "value": +1.5},
      {"frequency": 4000, "value": -2},
      {"frequency": 8000, "value": -5},
      {"frequency": 16000, "value": -9}
    ]
  }
}