import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  BarChart3Icon,
  UsersIcon,
  FileTextIcon,
  BellIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import ClientManagement from "@/components/admin/ClientManagement";
import AppointmentCalendar from "@/components/admin/AppointmentCalendar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for dashboard
  const stats = [
    { title: "Total Clients", value: "42", change: "+4% from last month" },
    { title: "Active Tickets", value: "7", change: "-2 from last week" },
    {
      title: "Pending Invoices",
      value: "$4,320",
      change: "5 invoices pending",
    },
    {
      title: "Monthly Revenue",
      value: "$8,750",
      change: "+12% from last month",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "New Client",
      name: "Sarah Johnson",
      company: "Coastal Realty",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "Service Request",
      name: "Mike Chen",
      company: "Chen Accounting",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "Invoice Paid",
      name: "Robert Garcia",
      company: "Garcia Law",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "Ticket Closed",
      name: "Emily Wong",
      company: "Wong Dental",
      time: "1 day ago",
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      client: "Coastal Realty",
      service: "Network Setup",
      date: "Today, 2:00 PM",
    },
    {
      id: 2,
      client: "Chen Accounting",
      service: "Security Camera Installation",
      date: "Tomorrow, 10:00 AM",
    },
    {
      id: 3,
      client: "Wong Dental",
      service: "Backup Solution Setup",
      date: "May 15, 1:30 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground">Tech Admin</h2>
            <p className="text-sm text-muted-foreground">
              IT Services Dashboard
            </p>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <BarChart3Icon className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("clients")}
            >
              <UsersIcon className="mr-2 h-4 w-4" />
              Clients
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("tickets")}
            >
              <FileTextIcon className="mr-2 h-4 w-4" />
              Service Tickets
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("invoices")}
            >
              <FileTextIcon className="mr-2 h-4 w-4" />
              Invoices
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("calendar")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </nav>

          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive"
              onClick={() => {
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Admin</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <BellIcon className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="Admin"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Dashboard Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="tickets">Service Tickets</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest client interactions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.name}`}
                            alt={activity.name}
                          />
                          <AvatarFallback>
                            {activity.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{activity.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.company}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            activity.type === "Invoice Paid"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {activity.type}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Scheduled service visits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {appointment.client}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {appointment.service}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{appointment.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients">
            <ClientManagement />
          </TabsContent>

          {/* Service Tickets Tab */}
          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>Service Tickets</CardTitle>
                <CardDescription>
                  Manage client service requests and support tickets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Service tickets management interface will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>
                  Create and manage client invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Invoice management interface will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <AppointmentCalendar />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
