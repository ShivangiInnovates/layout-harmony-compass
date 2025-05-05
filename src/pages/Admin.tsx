
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Search, Download, Eye, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Mock data for users and submissions
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    createdAt: "2023-01-15T08:00:00Z",
    lastLogin: "2023-05-05T10:30:00Z",
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
    createdAt: "2023-02-20T14:30:00Z",
    lastLogin: "2023-05-04T09:15:00Z",
  },
  {
    id: "3",
    email: "john.doe@example.com",
    name: "John Doe",
    role: "user",
    createdAt: "2023-03-05T11:20:00Z",
    lastLogin: "2023-05-03T16:45:00Z",
  },
  {
    id: "4",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    role: "user",
    createdAt: "2023-03-12T09:45:00Z",
    lastLogin: "2023-05-02T14:20:00Z",
  },
  {
    id: "5",
    email: "robert.johnson@example.com",
    name: "Robert Johnson",
    role: "user",
    createdAt: "2023-04-08T13:10:00Z",
    lastLogin: "2023-05-01T11:30:00Z",
  },
];

const MOCK_SUBMISSIONS = [
  {
    id: "sub_1",
    userId: "2",
    userName: "Regular User",
    userEmail: "user@example.com",
    name: "Manufacturing Plant Layout",
    departments: ["Receiving", "Raw Materials", "Manufacturing", "Assembly", "Packaging", "Warehouse", "Shipping"],
    score: 28,
    createdAt: "2023-04-28T09:30:00Z",
    data: {
      sequence: [0, 1, 2, 3, 4, 5, 6],
      relMatrix: [
        ["", "A", "U", "U", "U", "U", "O"],
        ["A", "", "A", "U", "U", "I", "U"],
        ["U", "A", "", "A", "U", "U", "U"],
        ["U", "U", "A", "", "A", "U", "U"],
        ["U", "U", "U", "A", "", "E", "U"],
        ["U", "I", "U", "U", "E", "", "A"],
        ["O", "U", "U", "U", "U", "A", ""],
      ]
    }
  },
  {
    id: "sub_2",
    userId: "2",
    userName: "Regular User",
    userEmail: "user@example.com",
    name: "Office Layout",
    departments: ["Reception", "HR", "IT", "Finance", "Meeting Rooms", "Executive", "Cafeteria"],
    score: 22,
    createdAt: "2023-05-01T14:15:00Z",
    data: {
      sequence: [0, 6, 1, 2, 3, 4, 5],
      relMatrix: [
        ["", "U", "U", "U", "E", "I", "A"],
        ["U", "", "O", "E", "I", "U", "U"],
        ["U", "O", "", "A", "I", "U", "U"],
        ["U", "E", "A", "", "O", "I", "U"],
        ["E", "I", "I", "O", "", "A", "U"],
        ["I", "U", "U", "I", "A", "", "U"],
        ["A", "U", "U", "U", "U", "U", ""],
      ]
    }
  },
  {
    id: "sub_3",
    userId: "3",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    name: "Retail Store Layout",
    departments: ["Entrance", "Checkout", "Electronics", "Clothing", "Groceries", "Home Goods", "Warehouse"],
    score: 25,
    createdAt: "2023-05-02T11:45:00Z",
    data: {
      sequence: [0, 2, 3, 5, 4, 1, 6],
      relMatrix: [
        ["", "O", "A", "E", "I", "I", "U"],
        ["O", "", "U", "U", "U", "U", "I"],
        ["A", "U", "", "E", "U", "O", "U"],
        ["E", "U", "E", "", "U", "A", "U"],
        ["I", "U", "U", "U", "", "E", "A"],
        ["I", "U", "O", "A", "E", "", "O"],
        ["U", "I", "U", "U", "A", "O", ""],
      ]
    }
  },
  {
    id: "sub_4",
    userId: "4",
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    name: "Hospital Department Layout",
    departments: ["Emergency", "ICU", "Surgery", "Radiology", "Pharmacy", "Lab", "Waiting Area", "Admin"],
    score: 31,
    createdAt: "2023-05-03T16:20:00Z",
    data: {
      sequence: [0, 1, 2, 3, 4, 5, 7, 6],
      relMatrix: [
        ["", "A", "E", "I", "I", "U", "O", "U"],
        ["A", "", "A", "I", "E", "I", "U", "U"],
        ["E", "A", "", "A", "E", "I", "U", "U"],
        ["I", "I", "A", "", "I", "A", "U", "U"],
        ["I", "E", "E", "I", "", "A", "U", "I"],
        ["U", "I", "I", "A", "A", "", "U", "O"],
        ["O", "U", "U", "U", "U", "U", "", "U"],
        ["U", "U", "U", "U", "I", "O", "U", ""],
      ]
    }
  },
  {
    id: "sub_5",
    userId: "5",
    userName: "Robert Johnson",
    userEmail: "robert.johnson@example.com",
    name: "Warehouse Optimization",
    departments: ["Receiving", "Storage", "Picking", "Packing", "Shipping", "Returns", "Office"],
    score: 27,
    createdAt: "2023-05-04T13:10:00Z",
    data: {
      sequence: [0, 1, 2, 3, 4, 5, 6],
      relMatrix: [
        ["", "A", "I", "U", "U", "E", "O"],
        ["A", "", "A", "O", "U", "I", "U"],
        ["I", "A", "", "A", "O", "U", "U"],
        ["U", "O", "A", "", "A", "I", "U"],
        ["U", "U", "O", "A", "", "A", "I"],
        ["E", "I", "U", "I", "A", "", "O"],
        ["O", "U", "U", "U", "I", "O", ""],
      ]
    }
  },
];

const Admin = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Load mock data
  useEffect(() => {
    setUsers(MOCK_USERS);
    setSubmissions(MOCK_SUBMISSIONS);
  }, []);

  // Filter submissions based on search term
  const filteredSubmissions = submissions.filter(sub =>
    sub.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewSubmission = (submission: any) => {
    setSelectedSubmission(submission);
    setIsSheetOpen(true);
  };

  const handleExportSubmissions = () => {
    const dataStr = JSON.stringify(filteredSubmissions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `layout-submissions-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm">Layout Harmony Compass</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-medium">{user?.name || user?.email}</div>
              <div className="text-sm text-muted-foreground">Administrator</div>
            </div>
            <Button variant="outline" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid gap-8">
          {/* Users Card */}
          <Card>
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
              <CardDescription>
                Overview of all users registered in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Last Login</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="capitalize">{user.role}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Submissions Card */}
          <Card>
            <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <CardTitle>Layout Submissions</CardTitle>
                <CardDescription>
                  All user-submitted layout analysis entries
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportSubmissions}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter Submissions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSearchTerm("")}>
                      All Submissions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSearchTerm("Regular User")}>
                      Regular User
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSearchTerm("John Doe")}>
                      John Doe
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSearchTerm("Jane Smith")}>
                      Jane Smith
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSearchTerm("Robert Johnson")}>
                      Robert Johnson
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search submissions..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Layout Name</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Departments</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        {submission.name}
                      </TableCell>
                      <TableCell>
                        <div>{submission.userName}</div>
                        <div className="text-sm text-muted-foreground">{submission.userEmail}</div>
                      </TableCell>
                      <TableCell>{submission.departments.length}</TableCell>
                      <TableCell className="text-center font-medium">{submission.score}</TableCell>
                      <TableCell>{new Date(submission.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewSubmission(submission)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredSubmissions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No submissions found matching your search criteria.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Submission Detail Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full md:max-w-lg overflow-y-auto">
          {selectedSubmission && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedSubmission.name}</SheetTitle>
                <SheetDescription>
                  Submitted by {selectedSubmission.userName} on{" "}
                  {new Date(selectedSubmission.createdAt).toLocaleDateString()}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Layout Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Departments</h4>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {selectedSubmission.departments.map((dept: string, idx: number) => (
                        <div key={idx} className="bg-muted p-2 rounded-md text-sm">
                          {idx + 1}. {dept}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Sequence</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedSubmission.data.sequence.map((idx: number, pos: number) => (
                        <div key={pos} className="flex items-center">
                          {pos > 0 && <span className="mx-1">→</span>}
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                            {idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">REL Matrix</h4>
                    <div className="overflow-x-auto mt-1">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            {selectedSubmission.data.relMatrix.map((_: any, idx: number) => (
                              <th key={idx} className="layout-matrix-header text-center w-8">
                                {idx + 1}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {selectedSubmission.data.relMatrix.map((row: string[], rowIdx: number) => (
                            <tr key={rowIdx}>
                              {row.map((cell: string, colIdx: number) => (
                                <td 
                                  key={colIdx} 
                                  className={`layout-matrix-cell rel-value-${cell}`}
                                >
                                  {cell || "-"}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Total Score</h4>
                    <div className="bg-primary/10 p-4 rounded-md mt-1">
                      <div className="text-3xl font-bold text-primary">
                        {selectedSubmission.score}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Admin;
