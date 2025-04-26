import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Appointment {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps: {
    client: string;
    email: string;
    phone: string;
    service: string;
    notes?: string;
    status: "confirmed" | "pending" | "completed" | "cancelled";
  };
}

const AppointmentCalendar = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch this data from your backend
    const mockAppointments: Appointment[] = [
      {
        id: "1",
        title: "Network Setup - Acme Corp",
        start: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
        end: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(),
        extendedProps: {
          client: "Acme Corporation",
          email: "contact@acmecorp.com",
          phone: "(949) 555-1234",
          service: "Network Setup & Troubleshooting",
          notes: "Complete office network setup with 5 workstations",
          status: "confirmed",
        },
      },
      {
        id: "2",
        title: "Security Camera - Sarah Johnson",
        start: new Date(
          new Date().setDate(new Date().getDate() + 1),
        ).toISOString(),
        end: new Date(
          new Date().setDate(new Date().getDate() + 1),
        ).toISOString(),
        extendedProps: {
          client: "Sarah Johnson",
          email: "sarah@example.com",
          phone: "(714) 555-5678",
          service: "Security Camera Installation",
          notes: "Install 3 outdoor cameras and setup mobile app",
          status: "pending",
        },
      },
      {
        id: "3",
        title: "Computer Repair - Michael Brown",
        start: new Date(
          new Date().setDate(new Date().getDate() + 2),
        ).toISOString(),
        end: new Date(
          new Date().setDate(new Date().getDate() + 2),
        ).toISOString(),
        extendedProps: {
          client: "Michael Brown",
          email: "michael@example.com",
          phone: "(657) 555-9012",
          service: "Computer Repair & Maintenance",
          status: "confirmed",
        },
      },
    ];

    setAppointments(mockAppointments);
  }, []);

  const handleEventClick = (info: any) => {
    const appointment = appointments.find((app) => app.id === info.event.id);
    if (appointment) {
      setSelectedAppointment(appointment);
      setIsDialogOpen(true);
    }
  };

  const handleStatusChange = (
    status: "confirmed" | "pending" | "completed" | "cancelled",
  ) => {
    if (selectedAppointment) {
      const updatedAppointments = appointments.map((app) => {
        if (app.id === selectedAppointment.id) {
          return {
            ...app,
            extendedProps: {
              ...app.extendedProps,
              status,
            },
          };
        }
        return app;
      });

      setAppointments(updatedAppointments);
      setSelectedAppointment({
        ...selectedAppointment,
        extendedProps: {
          ...selectedAppointment.extendedProps,
          status,
        },
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getEventBackgroundColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "#22c55e";
      case "pending":
        return "#eab308";
      case "completed":
        return "#3b82f6";
      case "cancelled":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <Card className="bg-white shadow-sm w-full">
      <CardHeader>
        <CardTitle>Appointment Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={appointments.map((appointment) => ({
            id: appointment.id,
            title: appointment.title,
            start: appointment.start,
            end: appointment.end,
            backgroundColor: getEventBackgroundColor(
              appointment.extendedProps.status,
            ),
            borderColor: getEventBackgroundColor(
              appointment.extendedProps.status,
            ),
          }))}
          eventClick={handleEventClick}
          height="auto"
          aspectRatio={1.5}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
            startTime: "09:00",
            endTime: "17:00",
          }}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedAppointment && (
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{selectedAppointment.title}</DialogTitle>
                <DialogDescription>
                  Appointment details and management
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Status:</span>
                  {getStatusBadge(selectedAppointment.extendedProps.status)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Client</p>
                    <p>{selectedAppointment.extendedProps.client}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Service</p>
                    <p>{selectedAppointment.extendedProps.service}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p>
                      {format(
                        new Date(selectedAppointment.start),
                        "MMMM d, yyyy",
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Time</p>
                    <p>
                      {format(new Date(selectedAppointment.start), "h:mm a")} -
                      {format(new Date(selectedAppointment.end), "h:mm a")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p>{selectedAppointment.extendedProps.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p>{selectedAppointment.extendedProps.phone}</p>
                  </div>
                </div>

                {selectedAppointment.extendedProps.notes && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Notes</p>
                    <p className="text-sm">
                      {selectedAppointment.extendedProps.notes}
                    </p>
                  </div>
                )}
              </div>

              <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange("confirmed")}
                    disabled={
                      selectedAppointment.extendedProps.status === "confirmed"
                    }
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange("completed")}
                    disabled={
                      selectedAppointment.extendedProps.status === "completed"
                    }
                  >
                    Complete
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange("cancelled")}
                    disabled={
                      selectedAppointment.extendedProps.status === "cancelled"
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    Cancel
                  </Button>
                </div>
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AppointmentCalendar;
