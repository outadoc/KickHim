#include "networkhandler.h"
#include <iostream>

using namespace std;

NetworkHandler::NetworkHandler(QObject* parent): QObject(parent)
{
    connect(&server, SIGNAL(newConnection()), this, SLOT(acceptConnection()));
    server.listen(QHostAddress::Any, 13374);
}

NetworkHandler::~NetworkHandler()
{
    server.close();
}

void NetworkHandler::acceptConnection()
{
    client = server.nextPendingConnection();
    connect(client, SIGNAL(readyRead()), this, SLOT(startRead()));
}

void NetworkHandler::startRead()
{
    char buffer[1024] = {0};
    client->read(buffer, client->bytesAvailable());
    cout << buffer << endl;
    executeCommand(buffer);
    client->close();
}

void NetworkHandler::executeCommand(string cmd)
{
    string winCommand;

    if(cmd == "close_mc") {
        winCommand = "taskkill /im javaw.exe";
    } else if(cmd == "shutdown") {
        winCommand = "shutdown /s /f";
    } else if(cmd == "shutdown_timed") {
        winCommand = "shutdown /s /t 30 /f";
    } else if(cmd == "shutdown_cancel") {
        winCommand = "shutdown /a";
    } else if(cmd == "close_session") {
        winCommand = "shutdown /l";
    } else if(cmd.find("custom_cmd") != string::npos) {
        winCommand = cmd.substr(cmd.find('$'));
    }

    cout << winCommand << endl;
    QProcess::execute(QString(winCommand.c_str()));
}
