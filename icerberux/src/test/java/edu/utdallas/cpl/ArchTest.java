package edu.utdallas.cpl;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("edu.utdallas.cpl");

        noClasses()
            .that()
            .resideInAnyPackage("edu.utdallas.cpl.service..")
            .or()
            .resideInAnyPackage("edu.utdallas.cpl.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..edu.utdallas.cpl.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
