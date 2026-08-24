import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { roleProfiles } from '@/data/roleProfiles';
import { RoleProfile } from '@/types/statsarthi';
import { Briefcase, Building, ChevronRight } from 'lucide-react';

interface RoleSelectorProps {
  onSelect: (role: RoleProfile) => void;
}

export function RoleSelector({ onSelect }: RoleSelectorProps) {
  const [selectedRoleId, setSelectedRoleId] = React.useState<string>('');

  const selectedRole = React.useMemo(
    () => roleProfiles.find((r) => r.id === selectedRoleId),
    [selectedRoleId]
  );

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-primary-700 flex items-center gap-2">
          <Briefcase className="h-6 w-6" />
          Select Your Official Role
        </CardTitle>
        <CardDescription>
          Choose your current designation to load the required competency framework.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none text-foreground">
              Designation
            </label>
            <Select onValueChange={setSelectedRoleId} value={selectedRoleId}>
              <SelectTrigger className="w-full bg-surface-50 border-input">
                <SelectValue placeholder="Select your designation..." />
              </SelectTrigger>
              <SelectContent>
                {roleProfiles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.designation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedRole && (
            <div className="bg-primary-50 rounded-lg p-4 border border-primary-100 flex items-start gap-3 mt-4">
              <Building className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-primary-800">{selectedRole.department}</p>
                <p className="text-sm text-primary-600 mt-1">
                  Required Competencies: {selectedRole.requiredCompetencies.length} areas
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedRole.requiredCompetencies.map(rc => (
                    <span key={rc.competencyId} className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-primary-700 border border-primary-200 shadow-sm">
                      {rc.competencyId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} (Level {rc.requiredLevel})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <Button 
          className="w-full mt-4" 
          disabled={!selectedRole}
          onClick={() => selectedRole && onSelect(selectedRole)}
        >
          Proceed to Diagnostic Assessment
          <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
