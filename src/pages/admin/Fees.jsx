import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import { FiDollarSign, FiCheckCircle, FiAlertCircle, FiPlus, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Fees = () => {
  const [feeRecords, setFeeRecords] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      rollNo: '001',
      class: '10-A',
      feeType: 'Tuition',
      amount: 5000,
      paid: 5000,
      pending: 0,
      dueDate: '2025-12-01',
      status: 'paid'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      rollNo: '002',
      class: '10-A',
      feeType: 'Tuition',
      amount: 5000,
      paid: 2500,
      pending: 2500,
      dueDate: '2025-12-01',
      status: 'partial'
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      rollNo: '003',
      class: '10-B',
      feeType: 'Tuition',
      amount: 5000,
      paid: 0,
      pending: 5000,
      dueDate: '2025-12-01',
      status: 'pending'
    },
    {
      id: 4,
      studentName: 'Sarah Williams',
      rollNo: '004',
      class: '11-A',
      feeType: 'Transport',
      amount: 1500,
      paid: 1500,
      pending: 0,
      dueDate: '2025-12-01',
      status: 'paid'
    },
    {
      id: 5,
      studentName: 'David Brown',
      rollNo: '005',
      class: '11-A',
      feeType: 'Library',
      amount: 500,
      paid: 0,
      pending: 500,
      dueDate: '2025-11-25',
      status: 'overdue'
    }
  ]);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRecordPayment = (record) => {
    setSelectedRecord(record);
    setPaymentAmount(record.pending.toString());
    setShowPaymentModal(true);
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    const amount = parseFloat(paymentAmount);

    if (amount <= 0 || amount > selectedRecord.pending) {
      toast.error('Invalid payment amount');
      return;
    }

    setFeeRecords(feeRecords.map(record => {
      if (record.id === selectedRecord.id) {
        const newPaid = record.paid + amount;
        const newPending = record.pending - amount;
        return {
          ...record,
          paid: newPaid,
          pending: newPending,
          status: newPending === 0 ? 'paid' : newPending < record.amount ? 'partial' : record.status
        };
      }
      return record;
    }));

    toast.success(`Payment of $${amount} recorded successfully!`);
    setShowPaymentModal(false);
    setSelectedRecord(null);
    setPaymentAmount('');
  };

  const filteredRecords = feeRecords.filter(record =>
    record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.rollNo.includes(searchTerm) ||
    record.class.includes(searchTerm)
  );

  const columns = [
    {
      key: 'rollNo',
      label: 'Roll No',
      sortable: true
    },
    {
      key: 'studentName',
      label: 'Student Name',
      sortable: true
    },
    {
      key: 'class',
      label: 'Class',
      sortable: true
    },
    {
      key: 'feeType',
      label: 'Fee Type',
      sortable: true
    },
    {
      key: 'amount',
      label: 'Total Amount',
      sortable: true,
      render: (row) => `$${row.amount.toLocaleString()}`
    },
    {
      key: 'paid',
      label: 'Paid',
      sortable: true,
      render: (row) => (
        <span className="text-green-600 font-semibold">${row.paid.toLocaleString()}</span>
      )
    },
    {
      key: 'pending',
      label: 'Pending',
      sortable: true,
      render: (row) => (
        <span className="text-red-600 font-semibold">${row.pending.toLocaleString()}</span>
      )
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge
          variant={
            row.status === 'paid' ? 'success' :
            row.status === 'partial' ? 'warning' :
            row.status === 'overdue' ? 'error' :
            'info'
          }
          className="capitalize"
        >
          {row.status}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <Button
          size="sm"
          disabled={row.status === 'paid'}
          onClick={() => handleRecordPayment(row)}
        >
          Record Payment
        </Button>
      )
    }
  ];

  const stats = {
    totalAmount: feeRecords.reduce((sum, r) => sum + r.amount, 0),
    collected: feeRecords.reduce((sum, r) => sum + r.paid, 0),
    pending: feeRecords.reduce((sum, r) => sum + r.pending, 0),
    overdue: feeRecords.filter(r => r.status === 'overdue').length
  };

  const collectionRate = ((stats.collected / stats.totalAmount) * 100).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
            <p className="text-gray-600 mt-1">Track and manage student fees</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${stats.totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <FiDollarSign className="w-8 h-8 text-gray-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Collected</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  ${stats.collected.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiCheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  ${stats.pending.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <FiAlertCircle className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Collection Rate</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{collectionRate}%</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FiDollarSign className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <div className="flex items-center gap-2">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by student name, roll number, or class..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border-0 focus:outline-none"
            />
          </div>
        </Card>

        {/* Fee Records Table */}
        <Card title="Fee Records" subtitle="View and manage all fee payments">
          <Table
            columns={columns}
            data={filteredRecords}
            hoverable
            striped
          />
        </Card>

        {/* Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Payment by Status">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Paid</span>
                <Badge variant="success">
                  {feeRecords.filter(r => r.status === 'paid').length} students
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Partial</span>
                <Badge variant="warning">
                  {feeRecords.filter(r => r.status === 'partial').length} students
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending</span>
                <Badge variant="info">
                  {feeRecords.filter(r => r.status === 'pending').length} students
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Overdue</span>
                <Badge variant="error">
                  {feeRecords.filter(r => r.status === 'overdue').length} students
                </Badge>
              </div>
            </div>
          </Card>

          <Card title="Fee by Type">
            <div className="space-y-3">
              {['Tuition', 'Transport', 'Library', 'Sports'].map(type => {
                const typeRecords = feeRecords.filter(r => r.feeType === type);
                const total = typeRecords.reduce((sum, r) => sum + r.amount, 0);
                return (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-gray-600">{type}</span>
                    <span className="font-semibold text-gray-900">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card title="Recent Payments">
            <div className="space-y-3">
              {feeRecords
                .filter(r => r.status === 'paid')
                .slice(0, 4)
                .map(record => (
                  <div key={record.id} className="p-3 bg-green-50 rounded-lg">
                    <p className="font-semibold text-gray-900">{record.studentName}</p>
                    <p className="text-sm text-gray-600">
                      ${record.amount} - {record.feeType}
                    </p>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedRecord(null);
          setPaymentAmount('');
        }}
        title="Record Payment"
      >
        {selectedRecord && (
          <form onSubmit={handleSubmitPayment} className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Student:</span>
                <span className="font-semibold">{selectedRecord.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class:</span>
                <span className="font-semibold">{selectedRecord.class}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fee Type:</span>
                <span className="font-semibold">{selectedRecord.feeType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold">${selectedRecord.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Already Paid:</span>
                <span className="font-semibold text-green-600">${selectedRecord.paid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending:</span>
                <span className="font-semibold text-red-600">${selectedRecord.pending}</span>
              </div>
            </div>

            <Input
              label="Payment Amount"
              type="number"
              step="0.01"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />

            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedRecord(null);
                  setPaymentAmount('');
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Record Payment</Button>
            </div>
          </form>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default Fees;
