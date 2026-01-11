# Payroll Website Application Security Lab Testing </br>

This project is a simple payroll web app, with added real security vulnerabilities, then exploit them, patch the issues, with implemented detailed logging, and a ML-based intrusion detection system (IDS) using normal and attack traffic logs.

**VIDEO DEMO/BREAKDOWN**:[(Coming Soon...)]</br>

***IMPORTANT***</br>
The packet capture application requires Npcap to be installed on the WebApp Host to ensure it runs correctly.</br>

================================================</br>
**Overview of the Lab (Layout)**</br>
================================================</br>

**Website Application**
Payroll App
- User Access Control Roles
- Access Control Management
- Uses MySQL for the Database
- Node.js Backend
- "npm start" to run

Attacker (Host Machine) </br>
- Uses the known vulnerbilites.txt to exploit the web app</br>

(The VM's use the same network *Using a bridged connection, however the IDS VM is set to read ONLY)</br>
VM #1 (Web App Hosted) </br>
- Sends System Logs and Traffic Logs over the network using Vector</br>
VM #2 (Intrusion Detection System Hosted)</br>
- IDS parses the logs with the nlohmann c++ json reader and checks using predefined rules and deviation from normal behaviour</br>

After the sucessful attack the web app's vulnerbilites were patched according to the OWASP Top 10 </br>

================================================</br>
**HOW TO RUN**</br>
================================================</br>

1. Clone the repo install MySQL (for db), and install the two Virtual Machines loaded with Window 10 ISO's</br>
2. Adjust image file paths to match your local directories</br>
3. Run the Packet Capture Application and host the live web app locally on the same VLAN (Default port 3000)</br>
4. Run Vector w/ logging files sender-vector.yaml and reciever-vector.yaml on both VM's to send and recieve the live logs and traffic over the network</br>
5. Run the IDS and enjoy having a safe Website Application :)</br>

**Future Improvements & Additions**
- Implement a machine learning model (using logistic regression) into the IDS for increased robustness
- Host the webapp in a container or VM Instance (either AWS or Docker)

