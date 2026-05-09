import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:lifeos/features/dashboard/presentation/pages/dashboard_page.dart';
import 'package:lifeos/features/chat/presentation/pages/chat_page.dart';
import 'package:lifeos/features/memory/presentation/pages/memory_page.dart';

void main() {
  runApp(const LifeOSApp());
}

class LifeOSApp extends StatelessWidget {
  const LifeOSApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LifeOS',
      theme: ThemeData(
        brightness: Brightness.light,
        primaryColor: const Color(0xFF5A5A40),
        scaffoldBackgroundColor: const Color(0xFFF5F5F0),
        fontFamily: 'Inter',
        useMaterial3: true,
      ),
      home: const MainNavigationPage(),
    );
  }
}

class MainNavigationPage extends StatefulWidget {
  const MainNavigationPage({super.key});

  @override
  State<MainNavigationPage> createState() => _MainNavigationPageState();
}

class _MainNavigationPageState extends State<MainNavigationPage> {
  int _selectedIndex = 0;

  final List<Widget> _pages = [
    const DashboardPage(),
    const ChatPage(),
    const MemoryPage(),
    const Center(child: Text('Settings')),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _selectedIndex,
        children: _pages,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) => setState(() => _selectedIndex = index),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.dashboard_outlined), label: 'Status'),
          NavigationDestination(icon: Icon(Icons.chat_bubble_outline), label: 'Brain'),
          NavigationDestination(icon: Icon(Icons.psychology_outlined), label: 'Memory'),
          NavigationDestination(icon: Icon(Icons.settings_outlined), label: 'Settings'),
        ],
      ),
    );
  }
}
