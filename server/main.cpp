#include <QApplication>
#include <QSystemTrayIcon>

#include "networkhandler.h"

int main(int argc, char* argv[])
{
    QApplication app(argc, argv);

    NetworkHandler* server = new NetworkHandler;

    return app.exec();
}
