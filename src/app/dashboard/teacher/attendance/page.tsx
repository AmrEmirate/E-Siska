"use client";
import { useState, useEffect } from "react";
import { useKelas } from "@/hooks/use-kelas";
import { useAbsensi } from "@/hooks/use-absensi";
import { ClassItem, SesiAbsensi } from "@/types/attendance";
import { ClassSelector } from "@/components/attendance/ClassSelector";
import { SessionList } from "@/components/attendance/SessionList";
import { CreateSessionModal } from "@/components/attendance/CreateSessionModal";
export default function AttendancePage() {
  const { fetchTeachingClasses } = useKelas();
  const { fetchSessionsByClass } = useAbsensi();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [sessions, setSessions] = useState<SesiAbsensi[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [nextMeetingNumber, setNextMeetingNumber] = useState(1);
  useEffect(() => {
    fetchClasses();
  }, []);
  useEffect(() => {
    if (selectedClass) {
      fetchSessions(selectedClass);
    } else {
      setSessions([]);
    }
  }, [selectedClass]);
  const fetchClasses = async () => {
    try {
      const teachingClasses = await fetchTeachingClasses();
      setClasses(teachingClasses);
    } catch (error) {
    } finally {
      setLoadingClasses(false);
    }
  };
  const fetchSessions = async (kelasId: string) => {
    setLoadingSessions(true);
    try {
      const sessionsData = await fetchSessionsByClass(kelasId);
      setSessions(sessionsData);
      if (sessionsData.length > 0) {
        setNextMeetingNumber(sessionsData[0].pertemuanKe + 1);
      } else {
        setNextMeetingNumber(1);
      }
    } catch (error) {
    } finally {
      setLoadingSessions(false);
    }
  };
  const handleClassChange = (classId: string) => {
    setSelectedClass(classId);
  };
  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    fetchSessions(selectedClass);
  };
  return (
    <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Absensi Kelas
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Kelola kehadiran siswa untuk kelas yang Anda ajar.
        </p>
      </div>
      <ClassSelector
        classes={classes}
        selectedClass={selectedClass}
        onClassChange={handleClassChange}
        loading={loadingClasses}
      />
      {selectedClass && (
        <SessionList
          sessions={sessions}
          loading={loadingSessions}
          onCreateClick={() => setShowCreateModal(true)}
        />
      )}
      <CreateSessionModal
        isOpen={showCreateModal}
        kelasId={selectedClass}
        defaultPertemuan={nextMeetingNumber}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
