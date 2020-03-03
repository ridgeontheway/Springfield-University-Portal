package com.coolGroup.org.config;

import com.coolGroup.org.models.Enrollment;
import com.coolGroup.org.models.Module;
import com.coolGroup.org.models.dtos.ModuleForStudentDto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Mapper {
    public static List<ModuleForStudentDto> mapModulesForStudent(List<Enrollment> enrollments,
                                                                 List<Module> modules) {
        List<ModuleForStudentDto> result = new ArrayList<>();
        HashMap<Integer, Module> moduleDictionary = new HashMap<>();
        for (Module module : modules) {
            moduleDictionary.put(module.getModule_id(), module);
        }
        for (Enrollment enrollment : enrollments) {
            Module module = moduleDictionary.get(enrollment.getModule());
            result.add(new ModuleForStudentDto(
                    module.getModule_id(),
                    module.getName(),
                    module.getCoordinator_name(),
                    enrollment.getGrade() != null ? enrollment.getGrade() : ""
            ));
        }
        return result;
    }
}
