import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Building2, User, Briefcase, ChevronRight } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    cadre: '',
    department: '',
    experience: '',
    currentAssignment: '',
    educationalQualifications: '',
    previousTrainings: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('statsarthi_profile', JSON.stringify(formData));
    navigate('/assessment'); // Redirect to diagnostic assessment
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-50">
      <Card className="w-full max-w-lg shadow-xl border-t-4 border-t-primary">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-muted w-16 h-16 flex items-center justify-center rounded-full mb-2">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Official Profile Setup</CardTitle>
          <CardDescription className="text-base">
            To personalize your FRAC competency mapping, please provide your current MoSPI designation.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" /> Full Name
              </Label>
              <Input 
                id="name" 
                placeholder="e.g. Rahul Sharma" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cadre" className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" /> Service Cadre / Role
              </Label>
              <Select required onValueChange={(val) => setFormData({...formData, cadre: val})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iss">Indian Statistical Service (ISS)</SelectItem>
                  <SelectItem value="sss">Subordinate Statistical Service (SSS)</SelectItem>
                  <SelectItem value="des">State DES Official</SelectItem>
                  <SelectItem value="other">Other / Ministry Official</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium">Department / Division</Label>
              <Input 
                id="department" 
                placeholder="e.g. National Accounts Division (NAD)" 
                required 
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="text-sm font-medium">Years of Experience</Label>
              <Select required onValueChange={(val) => setFormData({...formData, experience: val})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0-2 Years (Probationary)</SelectItem>
                  <SelectItem value="3-5">3-5 Years (Junior)</SelectItem>
                  <SelectItem value="6-15">6-15 Years (Mid-level)</SelectItem>
                  <SelectItem value="15+">15+ Years (Senior)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignment" className="text-sm font-medium">Current Assignment</Label>
              <Input 
                id="assignment" 
                placeholder="e.g. Field Data Collection, PLFS" 
                value={formData.currentAssignment}
                onChange={(e) => setFormData({...formData, currentAssignment: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education" className="text-sm font-medium">Educational Qualifications</Label>
              <Input 
                id="education" 
                placeholder="e.g. M.Sc. Statistics" 
                value={formData.educationalQualifications}
                onChange={(e) => setFormData({...formData, educationalQualifications: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trainings" className="text-sm font-medium">Previous Trainings (iGOT / NSSTA)</Label>
              <Input 
                id="trainings" 
                placeholder="e.g. Basics of R, CAPI Operations" 
                value={formData.previousTrainings}
                onChange={(e) => setFormData({...formData, previousTrainings: e.target.value})}
              />
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t px-6 py-4 rounded-b-xl">
            <Button type="submit" className="w-full text-lg h-12 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              Save Profile & Start Diagnostics <ChevronRight className="h-5 w-5" />
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
