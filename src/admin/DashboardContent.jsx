import React from "react";

const GOLD = "#BFA13B";
const DARK = "#8e7421";

const DashboardContent = () => {
  const stats = [
    { label: "Total Revenue", value: "$45,285.00", growth: "+12.5%", color: GOLD },
    { label: "Active Users", value: "2,420", growth: "+3.2%", color: DARK },
    { label: "New Leads", value: "156", growth: "-2.1%", color: GOLD },
    { label: "Conversion", value: "18.4%", growth: "+5.4%", color: DARK },
  ];

  const transactions = [
    { id: "TX-9012", client: "Alexander Pierce", date: "Oct 24, 2026", amount: "$1,200.00", status: "Paid" },
    { id: "TX-9013", client: "Elena Gilbert", date: "Oct 23, 2026", amount: "$850.00", status: "Pending" },
    { id: "TX-9014", client: "Marcus Aurelius", date: "Oct 22, 2026", amount: "$3,400.00", status: "Paid" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-stone-800" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Welcome back, Admin
        </h1>
        <p className="text-stone-400 text-xs uppercase tracking-widest font-bold mt-1">Here is what's happening today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <p className="text-stone-400 text-[10px] uppercase font-bold tracking-tighter">{stat.label}</p>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <span className={`text-[10px] font-bold ${stat.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.growth}
              </span>
            </div>
            <div className="h-1.5 w-full bg-stone-50 rounded-full mt-4 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: '70%', backgroundColor: stat.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="p-6 border-b border-stone-50 flex justify-between items-center">
            <h3 className="font-bold text-stone-800">Recent Transactions</h3>
            <button className="text-[10px] font-bold text-[#BFA13B] uppercase tracking-widest">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-stone-400 uppercase text-[10px] tracking-widest border-b border-stone-50">
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {transactions.map((tx, i) => (
                  <tr key={i} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-stone-500">{tx.id}</td>
                    <td className="px-6 py-4 font-bold">{tx.client}</td>
                    <td className="px-6 py-4">{tx.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase ${tx.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Small Widget Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 rounded-full border-4 border-stone-50 flex items-center justify-center mb-4" 
               style={{ borderTopColor: GOLD }}>
            <span className="text-xl font-bold">85%</span>
          </div>
          <h4 className="font-bold text-stone-800">Monthly Target</h4>
          <p className="text-stone-400 text-xs mt-2 px-4">You are currently ahead of your goals. Keep it up!</p>
          <button 
            className="mt-6 w-full py-3 rounded-xl text-white font-bold text-[10px] tracking-widest transition-transform active:scale-95"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}
          >
            GENERATE REPORT
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;