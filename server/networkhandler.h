#ifndef NETWORKHANDLER_H
#define NETWORKHANDLER_H

#include <QtGui>
#include <QtNetwork>

class NetworkHandler : public QObject
{
    Q_OBJECT

    public:
        NetworkHandler(QObject * parent = 0);
        ~NetworkHandler();
        void executeCommand(std::string);
    public slots:
        void acceptConnection();
        void startRead();
    private:
        QTcpServer server;
        QTcpSocket* client;
};

#endif // NETWORKHANDLER_H
