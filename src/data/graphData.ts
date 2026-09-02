export const mospiKnowledgeGraph = {
  "directed": false,
  "multigraph": false,
  "graph": {
    "hyperedges": [
      {
        "id": "frac_proficiency_mapping",
        "label": "FRAC Level Alignment",
        "nodes": [
          "competencyframework_proficiency_descriptors",
          "roleprofiles_jso",
          "roleprofiles_iss_director"
        ],
        "relation": "implement",
        "confidence": "EXTRACTED",
        "confidence_score": 0.95,
        "source_file": "competencyFramework.md"
      },
      {
        "id": "survey_design_competency_cluster",
        "label": "Survey Design Competency Ecosystem",
        "nodes": [
          "competencyframework_survey_design",
          "igotcourses_igot_ill_survey_01",
          "nsstacourses_nssta_survey_planning_design",
          "roleprofiles_jso"
        ],
        "relation": "participate_in",
        "confidence": "INFERRED",
        "confidence_score": 0.9,
        "source_file": "competencyFramework.md"
      }
    ]
  },
  "nodes": [
    {
      "id": "igotcourses_igot_ill_survey_01",
      "label": "Survey Design Principles (iGOT)",
      "community": 0,
      "community_name": "Survey Design and Sampling",
      "file_type": "code",
      "norm_label": "survey design principles (igot)",
      "rationale": "Illustrative module shaped after Sunbird telemetry/content schema.",
      "source_file": "igotCourses.md"
    },
    {
      "id": "nsstacourses_nssta_survey_planning_design",
      "label": "Planning and Designing of Large Scale Sample Surveys (NSSTA)",
      "community": 0,
      "community_name": "Survey Design and Sampling",
      "file_type": "code",
      "norm_label": "planning and designing of large scale sample surveys (nssta)",
      "source_file": "nsstaCourses.md"
    },
    {
      "id": "competencyframework_survey_design",
      "label": "Survey Design & Sampling",
      "community": 0,
      "community_name": "Survey Design and Sampling",
      "file_type": "concept",
      "norm_label": "survey design & sampling",
      "source_file": "competencyFramework.md"
    },
    {
      "id": "roleprofiles_jso",
      "label": "Junior Statistical Officer (JSO)",
      "community": 0,
      "community_name": "Survey Design and Sampling",
      "file_type": "concept",
      "norm_label": "junior statistical officer (jso)",
      "source_file": "roleProfiles.md"
    },
    {
      "id": "competencyframework_national_accounts",
      "label": "National Accounts & GDP",
      "community": 1,
      "community_name": "National Accounts and GDP",
      "file_type": "concept",
      "norm_label": "national accounts & gdp",
      "source_file": "competencyFramework.md"
    },
    {
      "id": "roleprofiles_iss_director",
      "label": "Director (ISS)",
      "community": 1,
      "community_name": "National Accounts and GDP",
      "file_type": "concept",
      "norm_label": "director (iss)",
      "source_file": "roleProfiles.md"
    },
    {
      "id": "competencyframework_statistical",
      "label": "Statistical Domain",
      "community": 2,
      "community_name": "Statistical Proficiency Standards",
      "file_type": "concept",
      "norm_label": "statistical domain",
      "source_file": "competencyFramework.md"
    },
    {
      "id": "competencyframework_proficiency_descriptors",
      "label": "Proficiency Level Descriptors",
      "community": 2,
      "community_name": "Statistical Proficiency Standards",
      "file_type": "rationale",
      "norm_label": "proficiency level descriptors",
      "rationale": "Maps to FRAC levels: 1=Awareness, 2=Foundation, 3=Practitioner, 4=Expert, 5=Ustad (mastery beyond Expert).",
      "source_file": "competencyFramework.md"
    },
    {
      "id": "nsstacourses_nssta_python_for_statisticians",
      "label": "Python Training for Statisticians (NSSTA)",
      "community": 3,
      "community_name": "Statistical Programming",
      "file_type": "code",
      "norm_label": "python training for statisticians (nssta)",
      "source_file": "nsstaCourses.md"
    },
    {
      "id": "competencyframework_python_r",
      "label": "Python & R Programming",
      "community": 3,
      "community_name": "Statistical Programming",
      "file_type": "concept",
      "norm_label": "python & r programming",
      "source_file": "competencyFramework.md"
    },
    {
      "id": "competencyframework_behavioural",
      "label": "Behavioural & Managerial Domain",
      "community": 4,
      "community_name": "Behavioral and Managerial Skills",
      "file_type": "concept",
      "norm_label": "behavioural & managerial domain",
      "source_file": "competencyFramework.md"
    },
    {
      "id": "competencyframework_digital_governance",
      "label": "Digital Governance Domain",
      "community": 5,
      "community_name": "Digital Governance",
      "file_type": "concept",
      "norm_label": "digital governance domain",
      "source_file": "competencyFramework.md"
    },
    {
      "id": "competencyframework_technical",
      "label": "Technical Domain",
      "community": 6,
      "community_name": "Technical Domain Knowledge",
      "file_type": "concept",
      "norm_label": "technical domain",
      "source_file": "competencyFramework.md"
    }
  ],
  "links": [
    {
      "source": "competencyframework_proficiency_descriptors",
      "target": "competencyframework_statistical",
      "relation": "conceptually_related_to",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "competencyFramework.md"
    },
    {
      "source": "competencyframework_survey_design",
      "target": "competencyframework_statistical",
      "relation": "conceptually_related_to",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "competencyFramework.md"
    },
    {
      "source": "igotcourses_igot_ill_survey_01",
      "target": "competencyframework_survey_design",
      "relation": "references",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "igotCourses.md"
    },
    {
      "source": "nsstacourses_nssta_python_for_statisticians",
      "target": "competencyframework_python_r",
      "relation": "references",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "nsstaCourses.md"
    },
    {
      "source": "nsstacourses_nssta_survey_planning_design",
      "target": "competencyframework_survey_design",
      "relation": "references",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "nsstaCourses.md"
    },
    {
      "source": "roleprofiles_iss_director",
      "target": "competencyframework_national_accounts",
      "relation": "references",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "roleProfiles.md"
    },
    {
      "source": "roleprofiles_jso",
      "target": "competencyframework_survey_design",
      "relation": "references",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "roleProfiles.md"
    }
  ],
  "hyperedges": [
    {
      "id": "frac_proficiency_mapping",
      "label": "FRAC Level Alignment",
      "nodes": [
        "competencyframework_proficiency_descriptors",
        "roleprofiles_jso",
        "roleprofiles_iss_director"
      ],
      "relation": "implement",
      "confidence": "EXTRACTED",
      "confidence_score": 0.95,
      "source_file": "competencyFramework.md"
    },
    {
      "id": "survey_design_competency_cluster",
      "label": "Survey Design Competency Ecosystem",
      "nodes": [
        "competencyframework_survey_design",
        "igotcourses_igot_ill_survey_01",
        "nsstacourses_nssta_survey_planning_design",
        "roleprofiles_jso"
      ],
      "relation": "participate_in",
      "confidence": "INFERRED",
      "confidence_score": 0.9,
      "source_file": "competencyFramework.md"
    }
  ],
  "built_at_commit": "eff0c997b388f6baf075e6b927639d65d77494b1"
};
export const mospiGraphReport = {
    "value":  "# Graph Report - mospi_knowledge  (2026-08-25)\r\n\r\n## Corpus Check\r\n- cluster-only mode — file stats not available\r\n\r\n## Summary\r\n- 13 nodes · 7 edges · 7 communities (1 shown, 6 thin omitted)\r\n- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS\r\n- Token cost: 179 input · 69 output\r\n\r\n## Graph Freshness\r\n- Built from commit: `eff0c997`\r\n- Run `git rev-parse HEAD` and compare to check if the graph is stale.\r\n- Run `graphify update .` after code changes (no API cost).\r\n\r\n## Community Hubs (Navigation)\r\n- Survey Design and Sampling\r\n- National Accounts and GDP\r\n- Statistical Proficiency Standards\r\n- Statistical Programming\r\n- Behavioral and Managerial Skills\r\n- Digital Governance\r\n- Technical Domain Knowledge\r\n\r\n## God Nodes (most connected - your core abstractions)\r\n1. `Survey Design \u0026 Sampling` - 4 edges\r\n2. `Statistical Domain` - 2 edges\r\n3. `Survey Design Principles (iGOT)` - 1 edges\r\n4. `Planning and Designing of Large Scale Sample Surveys (NSSTA)` - 1 edges\r\n5. `Junior Statistical Officer (JSO)` - 1 edges\r\n6. `National Accounts \u0026 GDP` - 1 edges\r\n7. `Director (ISS)` - 1 edges\r\n8. `Proficiency Level Descriptors` - 1 edges\r\n9. `Python Training for Statisticians (NSSTA)` - 1 edges\r\n10. `Python \u0026 R Programming` - 1 edges\r\n\r\n## Surprising Connections (you probably didn\u0027t know these)\r\n- `Survey Design Principles (iGOT)` --references--\u003e `Survey Design \u0026 Sampling`  [EXTRACTED]\r\n  igotCourses.md → competencyFramework.md\r\n- `Planning and Designing of Large Scale Sample Surveys (NSSTA)` --references--\u003e `Survey Design \u0026 Sampling`  [EXTRACTED]\r\n  nsstaCourses.md → competencyFramework.md\r\n- `Junior Statistical Officer (JSO)` --references--\u003e `Survey Design \u0026 Sampling`  [EXTRACTED]\r\n  roleProfiles.md → competencyFramework.md\r\n- `Director (ISS)` --references--\u003e `National Accounts \u0026 GDP`  [EXTRACTED]\r\n  roleProfiles.md → competencyFramework.md\r\n- `Python Training for Statisticians (NSSTA)` --references--\u003e `Python \u0026 R Programming`  [EXTRACTED]\r\n  nsstaCourses.md → competencyFramework.md\r\n\r\n## Import Cycles\r\n- None detected.\r\n\r\n## Hyperedges (group relationships)\r\n- **FRAC Level Alignment** — competencyframework_proficiency_descriptors, roleprofiles_jso, roleprofiles_iss_director [EXTRACTED 0.95]\r\n- **Survey Design Competency Ecosystem** — competencyframework_survey_design, igotcourses_igot_ill_survey_01, nsstacourses_nssta_survey_planning_design, roleprofiles_jso [INFERRED 0.90]\r\n\r\n## Communities (7 total, 6 thin omitted)\r\n\r\n### Community 0 - \"Survey Design and Sampling\"\r\nCohesion: 0.50\r\nNodes (4): Survey Design \u0026 Sampling, Survey Design Principles (iGOT), Planning and Designing of Large Scale Sample Surveys (NSSTA), Junior Statistical Officer (JSO)\r\n\r\n## Knowledge Gaps\r\n- **10 isolated node(s):** `Survey Design Principles (iGOT)`, `Planning and Designing of Large Scale Sample Surveys (NSSTA)`, `Junior Statistical Officer (JSO)`, `National Accounts \u0026 GDP`, `Director (ISS)` (+5 more)\r\n  These have ≤1 connection - possible missing edges or undocumented components.\r\n- **6 thin communities (\u003c3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.\r\n\r\n## Suggested Questions\r\n_Questions this graph is uniquely positioned to answer:_\r\n\r\n- **Why does `Survey Design \u0026 Sampling` connect `Survey Design and Sampling` to `Statistical Proficiency Standards`?**\r\n  _High betweenness centrality (0.136) - this node is a cross-community bridge._\r\n- **Why does `Statistical Domain` connect `Statistical Proficiency Standards` to `Survey Design and Sampling`?**\r\n  _High betweenness centrality (0.061) - this node is a cross-community bridge._\r\n- **What connects `Survey Design Principles (iGOT)`, `Planning and Designing of Large Scale Sample Surveys (NSSTA)`, `Junior Statistical Officer (JSO)` to the rest of the system?**\r\n  _10 weakly-connected nodes found - possible documentation gaps or missing edges._",
    "PSPath":  "C:\\Users\\CHANDRAKANT\\Downloads\\eduresources\\mospi_knowledge\\graphify-out\\GRAPH_REPORT.md",
    "PSParentPath":  "C:\\Users\\CHANDRAKANT\\Downloads\\eduresources\\mospi_knowledge\\graphify-out",
    "PSChildName":  "GRAPH_REPORT.md",
    "PSDrive":  {
                    "CurrentLocation":  "Users\\CHANDRAKANT\\Downloads\\eduresources",
                    "Name":  "C",
                    "Provider":  {
                                     "ImplementingType":  "Microsoft.PowerShell.Commands.FileSystemProvider",
                                     "HelpFile":  "System.Management.Automation.dll-Help.xml",
                                     "Name":  "FileSystem",
                                     "PSSnapIn":  "Microsoft.PowerShell.Core",
                                     "ModuleName":  "Microsoft.PowerShell.Core",
                                     "Module":  null,
                                     "Description":  "",
                                     "Capabilities":  52,
                                     "Home":  "C:\\Users\\CHANDRAKANT",
                                     "Drives":  "C"
                                 },
                    "Root":  "C:\\",
                    "Description":  "Windows-SSD",
                    "MaximumSize":  null,
                    "Credential":  {
                                       "UserName":  null,
                                       "Password":  null
                                   },
                    "DisplayRoot":  null
                },
    "PSProvider":  {
                       "ImplementingType":  {
                                                "Module":  "System.Management.Automation.dll",
                                                "Assembly":  "System.Management.Automation, Version=3.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35",
                                                "TypeHandle":  "System.RuntimeTypeHandle",
                                                "DeclaringMethod":  null,
                                                "BaseType":  "System.Management.Automation.Provider.NavigationCmdletProvider",
                                                "UnderlyingSystemType":  "Microsoft.PowerShell.Commands.FileSystemProvider",
                                                "FullName":  "Microsoft.PowerShell.Commands.FileSystemProvider",
                                                "AssemblyQualifiedName":  "Microsoft.PowerShell.Commands.FileSystemProvider, System.Management.Automation, Version=3.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35",
                                                "Namespace":  "Microsoft.PowerShell.Commands",
                                                "GUID":  "b4755d19-b6a7-38dc-ae06-4167f801062f",
                                                "IsEnum":  false,
                                                "GenericParameterAttributes":  null,
                                                "IsSecurityCritical":  true,
                                                "IsSecuritySafeCritical":  false,
                                                "IsSecurityTransparent":  false,
                                                "IsGenericTypeDefinition":  false,
                                                "IsGenericParameter":  false,
                                                "GenericParameterPosition":  null,
                                                "IsGenericType":  false,
                                                "IsConstructedGenericType":  false,
                                                "ContainsGenericParameters":  false,
                                                "StructLayoutAttribute":  "System.Runtime.InteropServices.StructLayoutAttribute",
                                                "Name":  "FileSystemProvider",
                                                "MemberType":  32,
                                                "DeclaringType":  null,
                                                "ReflectedType":  null,
                                                "MetadataToken":  33556356,
                                                "GenericTypeParameters":  "",
                                                "DeclaredConstructors":  "Void .ctor() Void .cctor()",
                                                "DeclaredEvents":  "",
                                                "DeclaredFields":  "System.Collections.ObjectModel.Collection`1[System.Management.Automation.WildcardPattern] excludeMatcher System.Management.Automation.PSTraceSource tracer Int32 FILETRANSFERSIZE System.String ProviderName",
                                                "DeclaredMembers":  "System.String NormalizePath(System.String) System.IO.FileSystemInfo GetFileSystemInfo(System.String, Boolean ByRef) Boolean IsFilterSet() System.Object GetChildNamesDynamicParameters(System.String) System.Object GetChildItemsDynamicParameters(System.String, Boolean) System.Object CopyItemDynamicParameters(System.String, System.String, Boolean) Boolean IsNetworkMappedDrive(System.Management.Automation.PSDriveInfo) Boolean IsSupportedDriveForPersistence(System.Management.Automation.PSDriveInfo) System.String GetRootPathForNetworkDriveOrDosDevice(System.IO.DriveInfo) System.Collections.ObjectModel.Collection`1[System.Management.Automation.PSDriveInfo] InitializeDefaultDrives() System.Object GetItemDynamicParameters(System.String) Void InvokeDefaultAction(System.String) Void GetChildItems(System.String, Boolean, UInt32) Void GetChildNames(System.String, System.Management.Automation.ReturnContainers) Boolean CheckItemExists(System.String, Boolean ByRef) System.Object RemoveItemDynamicParameters(System.String, Boolean) Void RemoveFileInfoItem(System.IO.FileInfo, Boolean) Boolean ItemExists(System.String) System.Object ItemExistsDynamicParameters(System.String) Boolean HasChildItems(System.String) Void CopyItemLocalOrToSession(System.String, System.String, Boolean, Boolean, System.Management.Automation.PowerShell) Void InitilizeFunctionPSCopyFileFromRemoteSession(System.Management.Automation.PowerShell) Boolean ValidRemoteSessionForScripting(System.Management.Automation.Runspaces.Runspace) Void InitilizeFunctionsPSCopyFileToRemoteSession(System.Management.Automation.PowerShell) Boolean PathIsReservedDeviceName(System.String, System.String) Boolean IsAbsolutePath(System.String) System.String GetCommonBase(System.String, System.String) System.String CreateNormalizedRelativePathFromStack(System.Collections.Generic.Stack`1[System.String]) Boolean IsItemContainer(System.String) Void MoveDirectoryInfoUnchecked(System.IO.DirectoryInfo, System.String, Boolean) Boolean IsSameVolume(System.String, System.String) System.Object GetPropertyDynamicParameters(System.String, System.Collections.ObjectModel.Collection`1[System.String]) System.Object SetPropertyDynamicParameters(System.String, System.Management.Automation.PSObject) System.Object ClearPropertyDynamicParameters(System.String, System.Collections.ObjectModel.Collection`1[System.String]) System.Object GetContentWriterDynamicParameters(System.String) System.Object ClearContentDynamicParameters(System.String) Int32 SafeGetFileAttributes(System.String) System.Security.AccessControl.ObjectSecurity NewSecurityDescriptorFromPath(System.String, System.Security.AccessControl.AccessControlSections) System.Security.AccessControl.ObjectSecurity NewSecurityDescriptorOfType(System.String, System.Security.AccessControl.AccessControlSections) System.Security.AccessControl.ObjectSecurity NewSecurityDescriptor(ItemType) System.Management.Automation.ErrorRecord CreateErrorRecord(System.String, System.String) System.String GetHelpMaml(System.String, System.String) System.Management.Automation.ProviderInfo Start(System.Management.Automation.ProviderInfo) System.Management.Automation.PSDriveInfo NewDrive(System.Management.Automation.PSDriveInfo) Void MapNetworkDrive(System.Management.Automation.PSDriveInfo) System.Management.Automation.PSDriveInfo RemoveDrive(System.Management.Automation.PSDriveInfo) System.String GetUNCForNetworkDrive(System.String) System.String GetSubstitutedPathForNetworkDosDevice(System.String) Boolean IsValidPath(System.String) Void GetItem(System.String) System.IO.FileSystemInfo GetFileSystemItem(System.String, Boolean ByRef, Boolean) Boolean ConvertPath(System.String, System.String, System.String ByRef, System.String ByRef) Void GetPathItems(System.String, Boolean, UInt32, Boolean, System.Management.Automation.ReturnContainers) Void Dir(System.IO.DirectoryInfo, Boolean, UInt32, Boolean, System.Management.Automation.ReturnContainers, InodeTracker) System.Management.Automation.FlagsExpression`1[System.IO.FileAttributes] FormatAttributeSwitchParamters() System.String Mode(System.Management.Automation.PSObject) Void RenameItem(System.String, System.String) Void NewItem(System.String, System.String, System.Object) ItemType GetItemType(System.String) Void CreateDirectory(System.String, Boolean) Boolean CreateIntermediateDirectories(System.String) Void RemoveItem(System.String, Boolean) Void RemoveDirectoryInfoItem(System.IO.DirectoryInfo, Boolean, Boolean, Boolean) Void RemoveFileSystemItem(System.IO.FileSystemInfo, Boolean) Boolean ItemExists(System.String, System.Management.Automation.ErrorRecord ByRef) Boolean DirectoryInfoHasChildItems(System.IO.DirectoryInfo) Void CopyItem(System.String, System.String, Boolean) Void CopyItemFromRemoteSession(System.String, System.String, Boolean, Boolean, System.Management.Automation.Runspaces.PSSession) Void CopyDirectoryInfoItem(System.IO.DirectoryInfo, System.String, Boolean, Boolean, System.Management.Automation.PowerShell) Void CopyFileInfoItem(System.IO.FileInfo, System.String, Boolean, System.Management.Automation.PowerShell) Void CopyDirectoryFromRemoteSession(System.String, System.String, System.String, Boolean, Boolean, System.Management.Automation.PowerShell) System.Collections.ArrayList GetRemoteSourceAlternateStreams(System.Management.Automation.PowerShell, System.String) Void RemoveFunctionsPSCopyFileFromRemoteSession(System.Management.Automation.PowerShell) System.Collections.Hashtable GetRemoteFileMetadata(System.String, System.Management.Automation.PowerShell) Void SetFileMetadata(System.String, System.IO.FileInfo, System.Management.Automation.PowerShell) Void CopyFileFromRemoteSession(System.String, System.String, System.String, Boolean, System.Management.Automation.PowerShell, Int64) Boolean PerformCopyFileFromRemoteSession(System.String, System.IO.FileInfo, System.String, Boolean, System.Management.Automation.PowerShell, Int64, Boolean, System.String) Void RemoveFunctionPSCopyFileToRemoteSession(System.Management.Automation.PowerShell) Boolean RemoteTargetSupportsAlternateStreams(System.Management.Automation.PowerShell, System.String) System.String MakeRemotePath(System.Management.Automation.PowerShell, System.String, System.String) Boolean RemoteDirectoryExist(System.Management.Automation.PowerShell, System.String) Boolean CopyFileStreamToRemoteSession(System.IO.FileInfo, System.String, System.Management.Automation.PowerShell, Boolean, System.String) System.Collections.Hashtable GetFileMetadata(System.IO.FileInfo) Void SetRemoteFileMetadata(System.IO.FileInfo, System.String, System.Management.Automation.PowerShell) Boolean PerformCopyFileToRemoteSession(System.IO.FileInfo, System.String, System.Management.Automation.PowerShell) Boolean RemoteDestinationPathIsFile(System.String, System.Management.Automation.PowerShell) System.String CreateDirectoryOnRemoteSession(System.String, Boolean, System.Management.Automation.PowerShell) System.String GetParentPath(System.String, System.String) Boolean IsUNCPath(System.String) Boolean IsUNCRoot(System.String) Boolean IsPathRoot(System.String) System.String NormalizeRelativePath(System.String, System.String) System.String NormalizeRelativePathHelper(System.String, System.String) System.String RemoveRelativeTokens(System.String) System.Collections.Generic.Stack`1[System.String] TokenizePathToStack(System.String, System.String) System.Collections.Generic.Stack`1[System.String] NormalizeThePath(System.String, System.Collections.Generic.Stack`1[System.String]) System.String GetChildName(System.String) System.String EnsureDriveIsRooted(System.String) Void MoveItem(System.String, System.String) Void MoveFileInfoItem(System.IO.FileInfo, System.String, Boolean, Boolean) Void MoveDirectoryInfoItem(System.IO.DirectoryInfo, System.String, Boolean) Void CopyAndDelete(System.IO.DirectoryInfo, System.String, Boolean) Void GetProperty(System.String, System.Collections.ObjectModel.Collection`1[System.String]) Void SetProperty(System.String, System.Management.Automation.PSObject) Void ClearProperty(System.String, System.Collections.ObjectModel.Collection`1[System.String]) System.Management.Automation.Provider.IContentReader GetContentReader(System.String) System.Object GetContentReaderDynamicParameters(System.String) System.Management.Automation.Provider.IContentWriter GetContentWriter(System.String) Void ClearContent(System.String) Void ValidateParameters(Boolean) Void GetSecurityDescriptor(System.String, System.Security.AccessControl.AccessControlSections) Void SetSecurityDescriptor(System.String, System.Security.AccessControl.ObjectSecurity) Void SetSecurityDescriptor(System.String, System.Security.AccessControl.ObjectSecurity, System.Security.AccessControl.AccessControlSections) Void \u003cRemoveDirectoryInfoItem\u003eg__WriteErrorHelper|43_0(System.Exception, \u003c\u003ec__DisplayClass43_0 ByRef) Void .ctor() Void .cctor() System.Collections.ObjectModel.Collection`1[System.Management.Automation.WildcardPattern] excludeMatcher System.Management.Automation.PSTraceSource tracer Int32 FILETRANSFERSIZE System.String ProviderName Microsoft.PowerShell.Commands.FileSystemProvider+ItemType Microsoft.PowerShell.Commands.FileSystemProvider+NativeMethods Microsoft.PowerShell.Commands.FileSystemProvider+NetResource Microsoft.PowerShell.Commands.FileSystemProvider+InodeTracker Microsoft.PowerShell.Commands.FileSystemProvider+\u003c\u003ec__DisplayClass43_0",
                                                "DeclaredMethods":  "System.String Mode(System.Management.Automation.PSObject) System.String NormalizePath(System.String) System.IO.FileSystemInfo GetFileSystemInfo(System.String, Boolean ByRef) Boolean IsFilterSet() System.Object GetChildNamesDynamicParameters(System.String) System.Object GetChildItemsDynamicParameters(System.String, Boolean) System.Object CopyItemDynamicParameters(System.String, System.String, Boolean) Boolean IsNetworkMappedDrive(System.Management.Automation.PSDriveInfo) Boolean IsSupportedDriveForPersistence(System.Management.Automation.PSDriveInfo) System.String GetRootPathForNetworkDriveOrDosDevice(System.IO.DriveInfo) System.Collections.ObjectModel.Collection`1[System.Management.Automation.PSDriveInfo] InitializeDefaultDrives() System.Object GetItemDynamicParameters(System.String) Void InvokeDefaultAction(System.String) Void GetChildItems(System.String, Boolean, UInt32) Void GetChildNames(System.String, System.Management.Automation.ReturnContainers) Boolean CheckItemExists(System.String, Boolean ByRef) System.Object RemoveItemDynamicParameters(System.String, Boolean) Void RemoveFileInfoItem(System.IO.FileInfo, Boolean) Boolean ItemExists(System.String) System.Object ItemExistsDynamicParameters(System.String) Boolean HasChildItems(System.String) Void CopyItemLocalOrToSession(System.String, System.String, Boolean, Boolean, System.Management.Automation.PowerShell) Void InitilizeFunctionPSCopyFileFromRemoteSession(System.Management.Automation.PowerShell) Boolean ValidRemoteSessionForScripting(System.Management.Automation.Runspaces.Runspace) Void InitilizeFunctionsPSCopyFileToRemoteSession(System.Management.Automation.PowerShell) Boolean PathIsReservedDeviceName(System.String, System.String) Boolean IsAbsolutePath(System.String) System.String GetCommonBase(System.String, System.String) System.String CreateNormalizedRelativePathFromStack(System.Collections.Generic.Stack`1[System.String]) Boolean IsItemContainer(System.String) Void MoveDirectoryInfoUnchecked(System.IO.DirectoryInfo, System.String, Boolean) Boolean IsSameVolume(System.String, System.String) System.Object GetPropertyDynamicParameters(System.String, System.Collections.ObjectModel.Collection`1[System.String]) System.Object SetPropertyDynamicParameters(System.String, System.Management.Automation.PSObject) System.Object ClearPropertyDynamicParameters(System.String, System.Collections.ObjectModel.Collection`1[System.String]) System.Object GetContentWriterDynamicParameters(System.String) System.Object ClearContentDynamicParameters(System.String) Int32 SafeGetFileAttributes(System.String) System.Security.AccessControl.ObjectSecurity NewSecurityDescriptorFromPath(System.String, System.Security.AccessControl.AccessControlSections) System.Security.AccessControl.ObjectSecurity NewSecurityDescriptorOfType(System.String, System.Security.AccessControl.AccessControlSections) System.Security.AccessControl.ObjectSecurity NewSecurityDescriptor(ItemType) System.Management.Automation.ErrorRecord CreateErrorRecord(System.String, System.String) System.String GetHelpMaml(System.String, System.String) System.Management.Automation.ProviderInfo Start(System.Management.Automation.ProviderInfo) System.Management.Automation.PSDriveInfo NewDrive(System.Management.Automation.PSDriveInfo) Void MapNetworkDrive(System.Management.Automation.PSDriveInfo) System.Management.Automation.PSDriveInfo RemoveDrive(System.Management.Automation.PSDriveInfo) System.String GetUNCForNetworkDrive(System.String) System.String GetSubstitutedPathForNetworkDosDevice(System.String) Boolean IsValidPath(System.String) Void GetItem(System.String) System.IO.FileSystemInfo GetFileSystemItem(System.String, Boolean ByRef, Boolean) Boolean ConvertPath(System.String, System.String, System.String ByRef, System.String ByRef) Void GetPathItems(System.String, Boolean, UInt32, Boolean, System.Management.Automation.ReturnContainers) Void Dir(System.IO.DirectoryInfo, Boolean, UInt32, Boolean, System.Management.Automation.ReturnContainers, InodeTracker) System.Management.Automation.FlagsExpression`1[System.IO.FileAttributes] FormatAttributeSwitchParamters() Void RenameItem(System.String, System.String) Void NewItem(System.String, System.String, System.Object) ItemType GetItemType(System.String) Void CreateDirectory(System.String, Boolean) Boolean CreateIntermediateDirectories(System.String) Void RemoveItem(System.String, Boolean) Void RemoveDirectoryInfoItem(System.IO.DirectoryInfo, Boolean, Boolean, Boolean) Void RemoveFileSystemItem(System.IO.FileSystemInfo, Boolean) Boolean ItemExists(System.String, System.Management.Automation.ErrorRecord ByRef) Boolean DirectoryInfoHasChildItems(System.IO.DirectoryInfo) Void CopyItem(System.String, System.String, Boolean) Void CopyItemFromRemoteSession(System.String, System.String, Boolean, Boolean, System.Management.Automation.Runspaces.PSSession) Void CopyDirectoryInfoItem(System.IO.DirectoryInfo, System.String, Boolean, Boolean, System.Management.Automation.PowerShell) Void CopyFileInfoItem(System.IO.FileInfo, System.String, Boolean, System.Management.Automation.PowerShell) Void CopyDirectoryFromRemoteSession(System.String, System.String, System.String, Boolean, Boolean, System.Management.Automation.PowerShell) System.Collections.ArrayList GetRemoteSourceAlternateStreams(System.Management.Automation.PowerShell, System.String) Void RemoveFunctionsPSCopyFileFromRemoteSession(System.Management.Automation.PowerShell) System.Collections.Hashtable GetRemoteFileMetadata(System.String, System.Management.Automation.PowerShell) Void SetFileMetadata(System.String, System.IO.FileInfo, System.Management.Automation.PowerShell) Void CopyFileFromRemoteSession(System.String, System.String, System.String, Boolean, System.Management.Automation.PowerShell, Int64) Boolean PerformCopyFileFromRemoteSession(System.String, System.IO.FileInfo, System.String, Boolean, System.Management.Automation.PowerShell, Int64, Boolean, System.String) Void RemoveFunctionPSCopyFileToRemoteSession(System.Management.Automation.PowerShell) Boolean RemoteTargetSupportsAlternateStreams(System.Management.Automation.PowerShell, System.String) System.String MakeRemotePath(System.Management.Automation.PowerShell, System.String, System.String) Boolean RemoteDirectoryExist(System.Management.Automation.PowerShell, System.String) Boolean CopyFileStreamToRemoteSession(System.IO.FileInfo, System.String, System.Management.Automation.PowerShell, Boolean, System.String) System.Collections.Hashtable GetFileMetadata(System.IO.FileInfo) Void SetRemoteFileMetadata(System.IO.FileInfo, System.String, System.Management.Automation.PowerShell) Boolean PerformCopyFileToRemoteSession(System.IO.FileInfo, System.String, System.Management.Automation.PowerShell) Boolean RemoteDestinationPathIsFile(System.String, System.Management.Automation.PowerShell) System.String CreateDirectoryOnRemoteSession(System.String, Boolean, System.Management.Automation.PowerShell) System.String GetParentPath(System.String, System.String) Boolean IsUNCPath(System.String) Boolean IsUNCRoot(System.String) Boolean IsPathRoot(System.String) System.String NormalizeRelativePath(System.String, System.String) System.String NormalizeRelativePathHelper(System.String, System.String) System.String RemoveRelativeTokens(System.String) System.Collections.Generic.Stack`1[System.String] TokenizePathToStack(System.String, System.String) System.Collections.Generic.Stack`1[System.String] NormalizeThePath(System.String, System.Collections.Generic.Stack`1[System.String]) System.String GetChildName(System.String) System.String EnsureDriveIsRooted(System.String) Void MoveItem(System.String, System.String) Void MoveFileInfoItem(System.IO.FileInfo, System.String, Boolean, Boolean) Void MoveDirectoryInfoItem(System.IO.DirectoryInfo, System.String, Boolean) Void CopyAndDelete(System.IO.DirectoryInfo, System.String, Boolean) Void GetProperty(System.String, System.Collections.ObjectModel.Collection`1[System.String]) Void SetProperty(System.String, System.Management.Automation.PSObject) Void ClearProperty(System.String, System.Collections.ObjectModel.Collection`1[System.String]) System.Management.Automation.Provider.IContentReader GetContentReader(System.String) System.Object GetContentReaderDynamicParameters(System.String) System.Management.Automation.Provider.IContentWriter GetContentWriter(System.String) Void ClearContent(System.String) Void ValidateParameters(Boolean) Void GetSecurityDescriptor(System.String, System.Security.AccessControl.AccessControlSections) Void SetSecurityDescriptor(System.String, System.Security.AccessControl.ObjectSecurity) Void SetSecurityDescriptor(System.String, System.Security.AccessControl.ObjectSecurity, System.Security.AccessControl.AccessControlSections) Void \u003cRemoveDirectoryInfoItem\u003eg__WriteErrorHelper|43_0(System.Exception, \u003c\u003ec__DisplayClass43_0 ByRef)",
                                                "DeclaredNestedTypes":  "Microsoft.PowerShell.Commands.FileSystemProvider+ItemType Microsoft.PowerShell.Commands.FileSystemProvider+NativeMethods Microsoft.PowerShell.Commands.FileSystemProvider+NetResource Microsoft.PowerShell.Commands.FileSystemProvider+InodeTracker Microsoft.PowerShell.Commands.FileSystemProvider+\u003c\u003ec__DisplayClass43_0",
                                                "DeclaredProperties":  "",
                                                "ImplementedInterfaces":  "System.Management.Automation.IResourceSupplier System.Management.Automation.Provider.IContentCmdletProvider System.Management.Automation.Provider.IPropertyCmdletProvider System.Management.Automation.Provider.ISecurityDescriptorCmdletProvider System.Management.Automation.Provider.ICmdletProviderSupportsHelp",
                                                "TypeInitializer":  "Void .cctor()",
                                                "IsNested":  false,
                                                "Attributes":  1048833,
                                                "IsVisible":  true,
                                                "IsNotPublic":  false,
                                                "IsPublic":  true,
                                                "IsNestedPublic":  false,
                                                "IsNestedPrivate":  false,
                                                "IsNestedFamily":  false,
                                                "IsNestedAssembly":  false,
                                                "IsNestedFamANDAssem":  false,
                                                "IsNestedFamORAssem":  false,
                                                "IsAutoLayout":  true,
                                                "IsLayoutSequential":  false,
                                                "IsExplicitLayout":  false,
                                                "IsClass":  true,
                                                "IsInterface":  false,
                                                "IsValueType":  false,
                                                "IsAbstract":  false,
                                                "IsSealed":  true,
                                                "IsSpecialName":  false,
                                                "IsImport":  false,
                                                "IsSerializable":  false,
                                                "IsAnsiClass":  true,
                                                "IsUnicodeClass":  false,
                                                "IsAutoClass":  false,
                                                "IsArray":  false,
                                                "IsByRef":  false,
                                                "IsPointer":  false,
                                                "IsPrimitive":  false,
                                                "IsCOMObject":  false,
                                                "HasElementType":  false,
                                                "IsContextful":  false,
                                                "IsMarshalByRef":  false,
                                                "GenericTypeArguments":  "",
                                                "CustomAttributes":  "[System.Management.Automation.OutputTypeAttribute(new Type[2] { typeof(System.String), typeof(System.IO.FileInfo) }, ProviderCmdlet = \"New-Item\")] [System.Management.Automation.OutputTypeAttribute(typeof(System.Security.AccessControl.FileSecurity), ProviderCmdlet = \"Set-Acl\")] [System.Management.Automation.OutputTypeAttribute(new Type[2] { typeof(System.String), typeof(System.Management.Automation.PathInfo) }, ProviderCmdlet = \"Resolve-Path\")] [System.Management.Automation.OutputTypeAttribute(typeof(System.Management.Automation.PathInfo), ProviderCmdlet = \"Push-Location\")] [System.Management.Automation.OutputTypeAttribute(new Type[2] { typeof(System.Byte), typeof(System.String) }, ProviderCmdlet = \"Get-Content\")] [System.Management.Automation.OutputTypeAttribute(typeof(System.IO.FileInfo), ProviderCmdlet = \"Get-Item\")] [System.Management.Automation.OutputTypeAttribute(new Type[2] { typeof(System.IO.FileInfo), typeof(System.IO.DirectoryInfo) }, ProviderCmdlet = \"Get-ChildItem\")] [System.Management.Automation.OutputTypeAttribute(new Type[2] { typeof(System.Security.AccessControl.FileSecurity), typeof(System.Security.AccessControl.DirectorySecurity) }, ProviderCmdlet = \"Get-Acl\")] [System.Management.Automation.OutputTypeAttribute(new Type[4] { typeof(System.Boolean), typeof(System.String), typeof(System.IO.FileInfo), typeof(System.IO.DirectoryInfo) }, ProviderCmdlet = \"Get-Item\")] [System.Management.Automation.OutputTypeAttribute(new Type[5] { typeof(System.Boolean), typeof(System.String), typeof(System.DateTime), typeof(System.IO.FileInfo), typeof(System.IO.DirectoryInfo) }, ProviderCmdlet = \"Get-ItemProperty\")] [System.Management.Automation.Provider.CmdletProviderAttribute(\"FileSystem\", (System.Management.Automation.Provider.ProviderCapabilities)52)]"
                                            },
                       "HelpFile":  "System.Management.Automation.dll-Help.xml",
                       "Name":  "FileSystem",
                       "PSSnapIn":  {
                                        "Name":  "Microsoft.PowerShell.Core",
                                        "IsDefault":  true,
                                        "ApplicationBase":  "C:\\Windows\\System32\\WindowsPowerShell\\v1.0",
                                        "AssemblyName":  "System.Management.Automation, Version=3.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35, ProcessorArchitecture=MSIL",
                                        "ModuleName":  "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\System.Management.Automation.dll",
                                        "PSVersion":  "5.1.26100.9168",
                                        "Version":  "3.0.0.0",
                                        "Types":  "types.ps1xml typesv3.ps1xml",
                                        "Formats":  "Certificate.format.ps1xml DotNetTypes.format.ps1xml FileSystem.format.ps1xml Help.format.ps1xml HelpV3.format.ps1xml PowerShellCore.format.ps1xml PowerShellTrace.format.ps1xml Registry.format.ps1xml",
                                        "Description":  "This Windows PowerShell snap-in contains cmdlets used to manage components of Windows PowerShell.",
                                        "Vendor":  "Microsoft Corporation",
                                        "LogPipelineExecutionDetails":  false
                                    },
                       "ModuleName":  "Microsoft.PowerShell.Core",
                       "Module":  null,
                       "Description":  "",
                       "Capabilities":  52,
                       "Home":  "C:\\Users\\CHANDRAKANT",
                       "Drives":  [
                                      "C"
                                  ]
                   },
    "ReadCount":  1
};
