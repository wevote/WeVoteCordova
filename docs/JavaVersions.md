
### Switching java versions (November 2021)

    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 and10 % /usr/libexec/java_home -V
    Matching Java Virtual Machines (4):
    17 (x86_64) "Oracle Corporation" - "Java SE 17" /Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
    16.0.2 (x86_64) "Amazon.com Inc." - "Amazon Corretto 16" /Users/stevepodell/Library/Java/JavaVirtualMachines/corretto-16.0.2/Contents/Home
    1.8.0_101 (x86_64) "Oracle Corporation" - "Java SE 8" /Library/Java/JavaVirtualMachines/jdk1.8.0_101.jdk/Contents/Home
    1.7.0_55 (x86_64) "Oracle Corporation" - "Java SE 7" /Library/Java/JavaVirtualMachines/jdk1.7.0_55.jdk/Contents/Home
    /Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 and10 % export JAVA_HOME=$(/usr/libexec/java_home -v 1.8.0_101)
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 and10 % java -version
    java version "1.8.0_101"
    Java(TM) SE Runtime Environment (build 1.8.0_101-b13)
    Java HotSpot(TM) 64-Bit Server VM (build 25.101-b13, mixed mode)
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 and10 % 
