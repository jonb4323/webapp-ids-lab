# Payroll Website Application Security Lab Testing 

This project is a simple payroll web app, with added real security vulnerabilities, then exploit them, patch the issues, with implemented detailed logging, and a ML-based intrusion detection system (IDS) using normal and attack traffic logs.

**VIDEO DEMO/BREAKDOWN**:[(Coming Soon...)]

***IMPORTANT***
The packet capture application requires Npcap to be installed on the WebApp Host to ensure it runs correctly.

================================================
***Overview of the Lab (Layout)***
================================================

Attacker (Host Machine) 
- Uses the known vulnerbilites.txt to exploit the web app

(The VM's use the same network *Using a bridged connection, however the IDS VM is set to read ONLY)
VM #1 (Web App Hosted) 
- Sends System Logs and Traffic Logs over the network using Vector
VM #2 (Intrusion Detection System Hosted)
- IDS parses the logs with the nlohmann c++ json reader and checks using predefined rules and deveation from normal behaviour

After the sucessful attack the web app's vulnerbilites were patched according to the OWASP Top 10 

================================================
***HOW TO RUN***
================================================

1. Clone the repo and install the two Virtual Machines loaded with Window 10 ISO's
2. Adjust image file paths to match your local directories
3. Run the Packet Capture Application and host the live web app locally on the same VLAN (Default port 3000)
4. Run the vector logging files sender and reciever on both VM's to send the live logs and traffic over the network
5. Run the IDS and enjoy having a safe Website Application :)
