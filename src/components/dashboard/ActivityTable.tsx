import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface Activity {
    id: string;
    childName: string;
    action: string;
    item?: string;
    amount: number;
    date: string;
    status: string;
}

interface ActivityTableProps {
    activities: Activity[];
}

const ActivityTable: React.FC<ActivityTableProps> = ({ activities }) => {
    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <button className="text-sm text-brand-blue flex items-center">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                </button>
            </div>

            <motion.div
                className="glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Child</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Activity</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map((activity, idx) => (
                                <motion.tr
                                    key={activity.id}
                                    className="border-b border-gray-100 last:border-0"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                >
                                    <td className="px-4 py-3 text-sm">{activity.childName}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <div>
                                            <span className="font-medium">{activity.action}</span>
                                            {activity.item && <p className="text-xs text-gray-500">{activity.item}</p>}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium">
                                        {activity.action === "Balance Added" ? (
                                            <span className="text-green-600">+${activity.amount.toFixed(2)}</span>
                                        ) : (
                                            <span className="text-gray-800">-${activity.amount.toFixed(2)}</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">{activity.date}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.status === "Completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}>
                                            {activity.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </section>
    );
};

export default ActivityTable;