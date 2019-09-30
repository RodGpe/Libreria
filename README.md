# Libreria
Para usar este codigo primero instale NVM (node version manager) para no tener problemas con los permisos al usarlo.

https://github.com/nvm-sh/nvm

El projecto fue probado con node version v10.16.3 (ultima version LTS)

Ahora para installar las dependencias en la carpeta del projeto correr

npm install

Para usar dependecinas "nativas" de node
npm postinstall

Mas sobre dependencias nativas:  https://electronjs.org/docs/tutorial/using-native-node-modules

Para corer la aplicacion:

npm start

#Base de datos
Para la base de datos se uso SQLite3 y se modelo con workbench, para exportar el modelo a un SCRIPT de SQLite usar el plugin:
https://github.com/tatsushid/mysql-wb-exportsqlite
