using Talent.Common.Contracts;
using Talent.Common.Models;
using Talent.Services.Profile.Domain.Contracts;
using Talent.Services.Profile.Models.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Talent.Services.Profile.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Talent.Common.Security;

namespace Talent.Services.Profile.Domain.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserAppContext _userAppContext;
        IRepository<UserLanguage> _userLanguageRepository;
        IRepository<User> _userRepository;
        IRepository<Employer> _employerRepository;
        IRepository<Job> _jobRepository;
        IRepository<Recruiter> _recruiterRepository;
        IFileService _fileService;
     //   private TalentProfileViewModel view;

        public ProfileService(IUserAppContext userAppContext,
                              IRepository<UserLanguage> userLanguageRepository,
                              IRepository<User> userRepository,
                              IRepository<Employer> employerRepository,
                              IRepository<Job> jobRepository,
                              IRepository<Recruiter> recruiterRepository,
                              IFileService fileService)
        {
            _userAppContext = userAppContext;
            _userLanguageRepository = userLanguageRepository;
            _userRepository = userRepository;
            _employerRepository = employerRepository;
            _jobRepository = jobRepository;
            _recruiterRepository = recruiterRepository;
            _fileService = fileService;
        }

        public bool AddNewLanguage(AddLanguageViewModel language)
        {

            //Your code here;
           
            throw new NotImplementedException();
        }
        public async Task<TalentProfileViewModel> viewTaletFeed(string Id)
        {
            //Your code here;

            throw new NotImplementedException();
        }
            public async Task<TalentProfileViewModel> GetTalentProfile(string Id)
        {
            User profile = null;

            profile = (await _userRepository.GetByIdAsync(Id));

            var videoUrl = "";
           

                if (profile != null)
                {
                    videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                              ? ""
                              : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);
                    var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();
                    var Languages = profile.Languages.Select(x => ViewModelFromLanguage(x)).ToList();
                    var Education = profile.Education.Select(x => ViewModelFromEducation(x)).ToList();
                    var Certifications = profile.Certifications.Select(x => ViewModelFromCertification(x)).ToList();
                    var Experience = profile.Experience.Select(x => ViewModelFromExperience(x)).ToList();
                   // var JobSeekingStatus = new JobSeekingStatus();
                var result = new TalentProfileViewModel
                    {
                        Id = profile.Id,
                        FirstName = profile.FirstName,
                        MiddleName = profile.MiddleName,
                        LastName = profile.LastName,
                        Gender = profile.Gender,
                        Email = profile.Email,
                        Phone = profile.Phone,
                        MobilePhone = profile.MobilePhone,
                        IsMobilePhoneVerified = profile.IsMobilePhoneVerified,
                        Address = profile.Address,
                        Nationality = profile.Nationality,
                        VisaStatus = profile.VisaStatus,
                        JobSeekingStatus  = profile.JobSeekingStatus,
                        VisaExpiryDate = profile.VisaExpiryDate,
                        Summary = profile.Summary,
                        Description = profile.Description,
                        Languages = Languages,
                        videoUrl = videoUrl,
                        VideoName = profile.VideoName,
                        Certifications = Certifications,
                        ProfilePhoto = profile.ProfilePhoto,
                        ProfilePhotoUrl = profile.ProfilePhotoUrl,
                        CvName = profile.CvName,
                        CvUrl = profile.CvName,
                        LinkedAccounts = profile.LinkedAccounts,
                        Skills = skills,
                        Experience = Experience
                    };
                    return result;
                }
            
           
            return null; 
        }

        private TalentProfileViewModel Json(object p)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentProfile(TalentProfileViewModel model, string updaterId)
        {
            try
            {
                if (model.Id != null)
                {
                    User existinguser = (await _userRepository.GetByIdAsync(model.Id));
                    existinguser.FirstName = model.FirstName;
                    existinguser.MiddleName = model.MiddleName;
                    existinguser.LastName = model.LastName;
                    existinguser.Gender = model.Gender;
                    existinguser.Email = model.Email;
                    existinguser.Phone = model.Phone;
                    existinguser.MobilePhone = model.MobilePhone;
                    existinguser.IsMobilePhoneVerified = model.IsMobilePhoneVerified;
                    existinguser.Address = model.Address;
                    existinguser.Nationality = model.Nationality;
                    existinguser.VisaStatus = model.VisaStatus;
                    existinguser.JobSeekingStatus = model.JobSeekingStatus;
                    existinguser.VisaExpiryDate = model.VisaExpiryDate;
                    existinguser.Summary = model.Summary;
                    existinguser.Description = model.Description;
                    existinguser.VideoName = model.VideoName;
                    existinguser.ProfilePhoto = model.ProfilePhoto;
                    existinguser.ProfilePhotoUrl = model.ProfilePhotoUrl;
                    existinguser.CvName = model.CvName;
                    existinguser.LinkedAccounts = model.LinkedAccounts;
                   // skills
                   var newSkills = new List<UserSkill>();
                    foreach (var item in model.Skills)
                    {
                        if (string.IsNullOrEmpty(item.Id))
                        {
                            item.Id = ObjectId.GenerateNewId().ToString();
                        }
                        newSkills.Add( new UserSkill
                            {
                                Id = item.Id,
                                IsDeleted = item.IsDeleted,
                                Skill = item.Name,
                                ExperienceLevel = item.Level,
                                UserId = item.UserId

                            }
                        );
                        
                    }
                    existinguser.Skills = newSkills;

                    // Language
                    var newLanguages = new List<UserLanguage>();
                    foreach (var item in model.Languages)
                    {
                        //create new id if its just been added
                        if (string.IsNullOrEmpty(item.Id))
                        {
                            item.Id = ObjectId.GenerateNewId().ToString();
                        }
                        newLanguages.Add(new UserLanguage
                        {
                            Id = item.Id,
                            Language = item.Name,
                            LanguageLevel = item.Level,
                            IsDeleted = item.IsDeleted,
                            UserId = model.Id
                        });
                    }
                    existinguser.Languages = newLanguages;


                    var newExperience = new List<UserExperience>();
                    foreach (var item in model.Experience)
                    {
                        if(string.IsNullOrEmpty(item.Id)){
                            item.Id = ObjectId.GenerateNewId().ToString();
                        }
                        newExperience.Add( new UserExperience
                            {
                                Id = item.Id,
                                Company = item.Company,
                                Position =item.Position,
                                Responsibilities =item.Responsibilities,
                                Start = item.Start,
                                End = item.End
                            });
                    }
                    existinguser.Experience = newExperience;

                    await _userRepository.Update(existinguser);

                }
                return true;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<EmployerProfileViewModel> GetEmployerProfile(string Id, string role)
        {

            Employer profile = null;
            switch (role)
            {
                case "employer":
                    profile = (await _employerRepository.GetByIdAsync(Id));
                    break;
                case "recruiter":
                    profile = (await _recruiterRepository.GetByIdAsync(Id));
                    break;
            }

            var videoUrl = "";

            if (profile != null)
            {
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);

                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();

                var result = new EmployerProfileViewModel
                {
                    Id = profile.Id,
                    CompanyContact = profile.CompanyContact,
                    PrimaryContact = profile.PrimaryContact,
                    Skills = skills,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,
                    DisplayProfile = profile.DisplayProfile,

                };
                return result;
            }

            return null;
        }

        public async Task<bool> UpdateEmployerProfile(EmployerProfileViewModel employer, string updaterId, string role)
        {
            try
            {
                if (employer.Id != null)
                {
                    switch (role)
                    {
                        case "employer":
                            Employer existingEmployer = (await _employerRepository.GetByIdAsync(employer.Id));
                            existingEmployer.CompanyContact = employer.CompanyContact;
                            existingEmployer.PrimaryContact = employer.PrimaryContact;
                            existingEmployer.ProfilePhoto = employer.ProfilePhoto;
                            existingEmployer.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingEmployer.DisplayProfile = employer.DisplayProfile;
                            existingEmployer.UpdatedBy = updaterId;
                            existingEmployer.UpdatedOn = DateTime.Now;

                            var newSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingEmployer.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newSkills.Add(skill);
                            }
                            existingEmployer.Skills = newSkills;

                            await _employerRepository.Update(existingEmployer);
                            break;

                        case "recruiter":
                            Recruiter existingRecruiter = (await _recruiterRepository.GetByIdAsync(employer.Id));
                            existingRecruiter.CompanyContact = employer.CompanyContact;
                            existingRecruiter.PrimaryContact = employer.PrimaryContact;
                            existingRecruiter.ProfilePhoto = employer.ProfilePhoto;
                            existingRecruiter.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingRecruiter.DisplayProfile = employer.DisplayProfile;
                            existingRecruiter.UpdatedBy = updaterId;
                            existingRecruiter.UpdatedOn = DateTime.Now;

                            var newRSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingRecruiter.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newRSkills.Add(skill);
                            }
                            existingRecruiter.Skills = newRSkills;
                            await _recruiterRepository.Update(existingRecruiter);

                            break;
                    }
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> UpdateEmployerPhoto(string employerId, IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
            {
                return false;
            }

            var profile = (await _employerRepository.Get(x => x.Id == employerId)).SingleOrDefault();

            if (profile == null)
            {
                return false;
            }

            var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = profile.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }

                profile.ProfilePhoto = newFileName;
                profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                await _employerRepository.Update(profile);
                return true;
            }

            return false;

        }

        public async Task<bool> AddEmployerVideo(string employerId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentPhoto(string talentId, IFormFile file)
        {
            //Your code here;
            if (file != null)
            {


                var fileExtension = Path.GetExtension(file.FileName);
                List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

                if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
                {
                    return false;
                }
                var profile = (await _userRepository.Get(x => x.Id == talentId)).SingleOrDefault();

                if (profile == null)
                {
                    return false;
                }

                var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

                if (!string.IsNullOrWhiteSpace(newFileName))
                {
                    var oldFileName = profile.ProfilePhoto;

                    if (!string.IsNullOrWhiteSpace(oldFileName))
                    {
                        await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                    }

                    profile.ProfilePhoto = newFileName;
                    profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                    await _userRepository.Update(profile);
                    return true;
                }
            }
            return false;
           // throw new NotImplementedException();
        }

        public async Task<bool> AddTalentVideo(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<bool> RemoveTalentVideo(string talentId, string videoName)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentCV(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<string>> GetTalentSuggestionIds(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(TalentSnapshotViewModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #region TalentMatching

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetFullTalentList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public IEnumerable<TalentMatchingEmployerViewModel> GetEmployerList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentMatchingEmployerViewModel>> GetEmployerListByFilterAsync(SearchCompanyModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetTalentListByFilterAsync(SearchTalentModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestion>> GetSuggestionList(string employerOrJobId, bool forJob, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> AddTalentSuggestions(AddTalentSuggestionList selectedTalents)
        {
            //Your code here;
            
                throw new NotImplementedException();
        }

        #endregion

        #region Conversion Methods

        #region Update from View

        protected void UpdateSkillFromView(AddSkillViewModel model, UserSkill Soriginal)
        {
            Soriginal.ExperienceLevel = model.Level;
            Soriginal.Skill = model.Name;
        }

        protected void UpdateLanguageFromView(AddLanguageViewModel model, UserLanguage Loriginal)
        {
            Loriginal.Language = model.Name;
            Loriginal.LanguageLevel = model.Level;
        }
        protected void UpdateeducationFromView(AddEducationViewModel model, UserEducation Eoriginal)
        {
            Eoriginal.InstituteName = model.InstituteName;
            Eoriginal.Country = model.Country;
            Eoriginal.Title = model.Title;
            Eoriginal.Degree = model.Degree;
            Eoriginal.YearOfGraduation = model.YearOfGraduation;
        }
        protected void UpdateCertificationFromView(AddCertificationViewModel model, UserCertification Coriginal)
        {
            Coriginal.CertificationName = model.CertificationName;
            Coriginal.CertificationFrom = model.CertificationFrom;
            Coriginal.CertificationYear = model.CertificationYear;
        }
        protected void UpdateExpireanceFromView( ExperienceViewModel model, UserExperience Eoriginal)
        {
            Eoriginal.Company = model.Company;
            Eoriginal.Position = model.Position;
            Eoriginal.Responsibilities = model.Responsibilities;
            Eoriginal.Start = model.Start;
            Eoriginal.End = model.End;
        }

        #endregion

        #region Build Views from Model
        protected TalentSnapshotViewModel userList(User user)
        {
            return new TalentSnapshotViewModel
            {
                Id = user.Id,
                Name = user.FirstName,
                PhotoId = user.ProfilePhotoUrl,
                VideoUrl = user.VideoName,
                CVUrl = user.CvName,
                Summary = user.Summary,
               // CurrentEmployment = user.
                Visa = user.VisaStatus
               // Level = user.le
            };
        }

        protected AddSkillViewModel ViewModelFromSkill(UserSkill skill)
        {
            return new AddSkillViewModel
            {
                Id = skill.Id,
                Level = skill.ExperienceLevel,
                Name = skill.Skill
            };
        }
        protected AddLanguageViewModel ViewModelFromLanguage(UserLanguage Language)
        {
            return new AddLanguageViewModel
            {
                Id = Language.Id,
                Name = Language.Language,
                Level = Language.LanguageLevel,
                CurrentUserId = Language.UserId,
            };
        }
        protected AddEducationViewModel ViewModelFromEducation(UserEducation education)
        {
            return new AddEducationViewModel
            {
                Id = education.Id,
                Country = education.Country,
                InstituteName = education.InstituteName,
                Title = education.Title,
                Degree = education.Degree,
                YearOfGraduation = education.YearOfGraduation

            };
        }
        protected AddCertificationViewModel ViewModelFromCertification(UserCertification certification)
        {
            return new AddCertificationViewModel
            {
                Id = certification.Id,
                CertificationName = certification.CertificationName,
                CertificationFrom = certification.CertificationFrom,
                CertificationYear = certification.CertificationYear
            };
        }
        protected ExperienceViewModel ViewModelFromExperience(UserExperience Experience)
        {
            return new ExperienceViewModel
            {
                Id = Experience.Id,
                Company = Experience.Company,
                Position = Experience.Position,
                Responsibilities = Experience.Responsibilities,
                Start = Experience.Start,
                End = Experience.End


            };
        }
        protected LocationViewModel ViewModelFromLocation(UserLocation Location)
        {
            return new LocationViewModel
            {
                Country = Location.Country,
                City = Location.City,
            };
        }
        #endregion

        #endregion

        #region ManageClients

        public async Task<IEnumerable<ClientViewModel>> GetClientListAsync(string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<ClientViewModel> ConvertToClientsViewAsync(Client client, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }
         
        public async Task<int> GetTotalTalentsForClient(string clientId, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<Employer> GetEmployer(string employerId)
        {
            return await _employerRepository.GetByIdAsync(employerId);
        }

        public Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(IEnumerable<string> ids)
        {
            throw new NotImplementedException();
        }


        #endregion

    }
}
