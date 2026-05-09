import 'package:flutter/material.dart';

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('LifeOS Status', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildInsightCard(),
            const SizedBox(height: 25),
            const Text('System Nodes', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 15),
            _buildStatusGrid(),
          ],
        ),
      ),
    );
  }

  Widget _buildInsightCard() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFF5A5A40),
        borderRadius: BorderRadius.circular(32),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('DAILY INSIGHT', style: TextStyle(color: Colors.white60, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 2)),
          const SizedBox(height: 8),
          const Text('Correlation Detected', style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold, fontStyle: FontStyle.italic)),
          const SizedBox(height: 12),
          const Text('Your focus peaks when you start tasks before 9 AM. You have 3 deep work blocks available today.', 
            style: TextStyle(color: Colors.white70, height: 1.5)),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(backgroundColor: Colors.white, foregroundColor: const Color(0xFF5A5A40)),
            child: const Text('SYNC SCHEDULE'),
          )
        ],
      ),
    );
  }

  Widget _buildStatusGrid() {
    return GridView.count(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 2,
      mainAxisSpacing: 16,
      crossAxisSpacing: 16,
      children: [
        _buildStatTile('MEMORIES', '1,248', Icons.brain),
        _buildStatTile('HEART RATE', '72 BPM', Icons.favorite),
        _buildStatTile('EXPENSES', '\$142', Icons.payments),
        _buildStatTile('MOOD', 'STABLE', Icons.wb_sunny),
      ],
    );
  }

  Widget _buildStatTile(String label, String value, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFE6E6DF)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Icon(icon, color: const Color(0xFF5A5A40), size: 20),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              Text(label, style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.grey)),
            ],
          )
        ],
      ),
    );
  }
}
