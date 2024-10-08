import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

const DropdownBox = ({ mentors, onFilterChange, filters }) => {
  const [availableOptions, setAvailableOptions] = useState({
    faculty: [],
    meetingFormat: [],
    researchField: [],
    projectType: [],
  });

  useEffect(() => {
    // Always calculate the faculty options from the entire list of mentors
    const allFacultyOptions = [...new Set(mentors.map((item) => item.faculty))];

    // Calculate the other options based on the filtered mentors
    const filteredMentors = mentors.filter(
      (mentor) =>
        (filters.faculty.length > 0
          ? filters.faculty.includes(mentor.faculty)
          : true) &&
        (filters.meetingFormat.length > 0
          ? filters.meetingFormat.includes(mentor.meetingFormat)
          : true) &&
        (filters.researchField.length > 0
          ? filters.researchField.some((field) =>
              mentor.researchField.includes(field)
            )
          : true) &&
        (filters.projectType.length > 0
          ? filters.projectType.includes(mentor.projectType)
          : true)
    );

    const availableMeetingFormats = [
      ...new Set(filteredMentors.map((item) => item.meetingFormat)),
    ];

    const availableResearchFields = [
      ...new Set(filteredMentors.map((item) => item.researchField)),
    ];

    const availableProjectTypes = [
      ...new Set(filteredMentors.map((item) => item.projectType)),
    ];

    setAvailableOptions({
      faculty: allFacultyOptions, // Show all faculties regardless of other filters
      meetingFormat: availableMeetingFormats,
      researchField: availableResearchFields,
      projectType: availableProjectTypes,
    });
  }, [mentors, filters]);

  return (
    <div className="bg-[#56A79B] p-4 shadow-lg rounded-lg flex justify-between items-center space-x-4">
      <Dropdown
        label="Faculty"
        options={availableOptions.faculty}
        selectedOptions={filters.faculty}
        onChange={onFilterChange}
        filterKey="faculty"
      />
      <Dropdown
        label="Meeting Format"
        options={availableOptions.meetingFormat}
        selectedOptions={filters.meetingFormat}
        onChange={onFilterChange}
        filterKey="meetingFormat"
      />
      <Dropdown
        label="Project Type"
        options={availableOptions.projectType}
        selectedOptions={filters.projectType}
        onChange={onFilterChange}
        filterKey="projectType"
      />
      <Dropdown
        label="Research Field"
        options={availableOptions.researchField}
        selectedOptions={filters.researchField}
        onChange={onFilterChange}
        filterKey="researchField"
      />
    </div>
  );
};

export default DropdownBox;
