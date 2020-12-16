FROM nodered/node-red

RUN npm install node-red-contrib-emotiv-bci

ADD ./bci-config.js /usr/src/node-red/node_modules/node-red-contrib-emotiv-bci/emotiv-bci/bci-config.js
ADD ./data /data
