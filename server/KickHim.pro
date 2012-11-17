QT += network

CONFIG -= x86_64

SOURCES += \
    main.cpp \
    networkhandler.cpp

HEADERS += \
    networkhandler.h

QMAKE_CXXFLAGS += -fpermissive
