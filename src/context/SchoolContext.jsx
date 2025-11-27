import { createContext, useState, useContext, useEffect } from 'react';
import { mockSchools } from '../data/mockOtherData';
import { useAuth } from './AuthContext';

const SchoolContext = createContext();

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};

export const SchoolProvider = ({ children }) => {
  const { user } = useAuth();
  const [currentSchool, setCurrentSchool] = useState(null);
  const [schools, setSchools] = useState(mockSchools);

  useEffect(() => {
    // Set current school based on user's schoolId
    if (user && user.schoolId) {
      const school = schools.find((s) => s.id === user.schoolId);
      setCurrentSchool(school);
    }
  }, [user, schools]);

  const updateSchool = (schoolId, updates) => {
    setSchools((prevSchools) =>
      prevSchools.map((school) =>
        school.id === schoolId ? { ...school, ...updates } : school
      )
    );

    if (currentSchool && currentSchool.id === schoolId) {
      setCurrentSchool({ ...currentSchool, ...updates });
    }
  };

  const addSchool = (newSchool) => {
    const schoolWithId = { ...newSchool, id: schools.length + 1 };
    setSchools([...schools, schoolWithId]);
    return schoolWithId;
  };

  const deleteSchool = (schoolId) => {
    setSchools(schools.filter((school) => school.id !== schoolId));
    if (currentSchool && currentSchool.id === schoolId) {
      setCurrentSchool(null);
    }
  };

  const getSchoolById = (schoolId) => {
    return schools.find((school) => school.id === schoolId);
  };

  const value = {
    currentSchool,
    schools,
    updateSchool,
    addSchool,
    deleteSchool,
    getSchoolById,
    setCurrentSchool,
  };

  return (
    <SchoolContext.Provider value={value}>{children}</SchoolContext.Provider>
  );
};

export default SchoolContext;
