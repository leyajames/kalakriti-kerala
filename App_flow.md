# Complete Application Flow (App_flow.md)
## KALAKRITI – Discover. Preserve. Showcase.
**End-to-End User Journeys, State Machines & Information Architecture**

---

### Document Control
- **Document Version:** 1.0.0
- **Scope:** Public Visitor, Artisan, Event Organizer, and Cultural Curator Flowcharts
- **Design Methodology:** User-Centric, Mobile-First, Culturally Sensitive

---

## 1. Information Architecture & Sitemap Tree

```mermaid
graph TD
    Home["Home (Landing Page / Hero Showcase)"]
    
    %% Main Navigation Branches
    Home --> Discover["/discover - Cultural Hub"]
    Home --> MapView["/map - Interactive Thrissur Map"]
    Home --> Artists["/artists - Artisan Directory"]
    Home --> Events["/events - Festival Calendar & Poorams"]
    Home --> Heritage["/heritage - Sacred & Historic Monuments"]
    Home --> Workshops["/workshops - Masterclasses"]
    
    %% Discover Branch
    Discover --> ArtformDetail["/artforms/[slug] - Dossier & Audio Guide"]
    Discover --> LivingTraditions["/artforms/categories (Performing, Melam, Craft, Textile)"]
    
    %% Map Branch
    MapView --> MapFilter["Filters: By Taluk, Heritage Sites, Studios, Live Events"]
    MapView --> GeoTrails["/trails/[trailId] - Curated Cultural Circuits"]
    
    %% Artists Branch
    Artists --> ArtistProfile["/artists/[id] - Portfolio, Bio, Studio & Guru Lineage"]
    ArtistProfile --> CommissionModal["Direct Commission & Performance Inquiry"]
    ArtistProfile --> ArtworkViewer["/artworks/[artworkId] - High-Res Lightbox & Story"]
    
    %% Events Branch
    Events --> EventDetail["/events/[slug] - Pooram Timetable & Melam Lineups"]
    EventDetail --> EventRSVP["RSVP & Calendar Sync (iCal / Google)"]
    
    %% Auth & User Portals
    Home --> Auth["/auth (Phone OTP / Google Login)"]
    Auth --> DashboardUser["/dashboard/explorer - Bookmarks & Inquiries"]
    Auth --> DashboardArtist["/dashboard/artist - Studio, Artworks, Workshops, Leads"]
    Auth --> DashboardCurator["/dashboard/curator - Verification Queue & Moderation"]
    Auth --> DashboardAdmin["/dashboard/admin - Platform Metrics & Audit Logs"]
```

---

## 2. Core User Journey Maps

### Journey 1: Public Cultural Explorer & Tourist Journey
Discovering traditional arts, exploring on the map, and inquiring with an artisan.

```mermaid
sequenceDiagram
    autonumber
    actor Explorer as Cultural Explorer / Tourist
    participant UI as Kalakriti Web UI
    participant MapEngine as MapLibre / PostGIS Engine
    participant DB as Database / CDN
    actor Artisan as Master Artisan

    Explorer->>UI: Lands on Homepage (Selects Language: EN / മലയാളം)
    UI->>Explorer: Displays Hero Banner, Today's Pooram/Events & Featured Masters
    Explorer->>UI: Clicks "Explore Thrissur Map"
    UI->>MapEngine: Request GeoJSON points within Thrissur bounding box
    MapEngine-->>UI: Returns Clusters (Heritage Sites, Active Studios, Temples)
    Explorer->>UI: Filters by "Kuthampully Handloom" & zooms to Thiruvilwamala
    UI->>Explorer: Shows Artisan Studio Pin with Kasavu Badge
    Explorer->>UI: Clicks Studio Pin -> Opens Artist Profile Preview Card
    Explorer->>UI: Navigates to Full Artist Profile
    UI->>DB: Fetch portfolio gallery, video demonstrations & master bio
    DB-->>UI: Render high-res gallery with responsive blurhash images
    Explorer->>UI: Clicks "Commission Artwork / Book Performance"
    UI->>Explorer: Presents lightweight inquiry modal (Purpose, Date, Budget)
    Explorer->>UI: Submits Inquiry
    UI->>DB: Record inquiry in database
    UI-->>Artisan: Triggers instant WhatsApp callback & in-app notification
    UI-->>Explorer: Shows confirmation & direct WhatsApp link
```

---

### Journey 2: Artisan & Traditional Performer Onboarding Flow
Empowering local masters and folk artists to self-register and get verified.

```mermaid
flowchart TD
    Start["Artisan visits /register/artist"] --> PhoneInput["Enter Mobile Number"]
    PhoneInput --> SendOTP["Send 6-Digit SMS OTP (Malayalam/English)"]
    SendOTP --> VerifyOTP{"OTP Valid?"}
    VerifyOTP -- No --> PhoneInput
    VerifyOTP -- Yes --> Step1["Step 1: Basic Identity & Traditional Stage Name"]
    
    Step1 --> Step2["Step 2: Artform Taxonomy & Guru Parampara (Lineage)"]
    Step2 --> Step3["Step 3: Studio / Kalari Location (GPS Pin Drop on Thrissur Map)"]
    Step3 --> Step4["Step 4: Contact Preferences (Public WhatsApp vs Proxy Inquiry)"]
    Step4 --> Step5["Step 5: Portfolio Upload (First 3-5 Artworks/Performance Photos)"]
    
    Step5 --> Step6{"Submit for Verification Badge?"}
    Step6 -- "Later / Basic Profile" --> LiveBasic["Published as Community Artisan (Unverified)"]
    Step6 -- "Yes, Apply for Master Badge" --> UploadCredentials["Upload Artisan Card / Akademi ID / Video Proof"]
    UploadCredentials --> ModQueue["Dispatched to Cultural Curator Review Queue"]
    ModQueue --> CuratorReview{"Curator Review Outcome"}
    CuratorReview -- "Approved" --> VerifiedBadge["Profile Granted 'Verified Master' Badge ✨"]
    CuratorReview -- "Needs Info" --> Feedback["Artisan notified via SMS to update details"]
    CuratorReview -- "Rejected" --> BasicStay["Retains standard listing without badge"]
```

---

### Journey 3: Artwork & Craft Portfolio Publishing Flow
Adding a new traditional craft or performance with the story behind the art.

```mermaid
flowchart TD
    Artisan["Artisan enters Studio Dashboard"] --> ClickAdd["Clicks 'Add New Artwork / Performance'"]
    ClickAdd --> UploadMedia["Drop High-Resolution Photos / Audio Clip / Video Link"]
    UploadMedia --> PreProcess["Client-side EXIF sanitize & BlurHash computation"]
    PreProcess --> DirectS3["Direct secure upload to Storage Bucket (R2/Cloudinary)"]
    
    DirectS3 --> FormMeta["Fill Craft Metadata:"]
    FormMeta --> Fields["- Title (English & Malayalam)<br>- Medium (e.g. Bronze, Teakwood, Kasavu Cotton)<br>- Dimensions & Weight<br>- Price Indication / For Sale toggle"]
    
    Fields --> CraftStory["Craft Heritage Section: Describe the Traditional Technique, Natural Pigments & Time Spent"]
    CraftStory --> SaveDraft{"Save Action"}
    
    SaveDraft -- "Save as Draft" --> DraftDB["Saved in Drafts (Not Visible to Public)"]
    SaveDraft -- "Publish Now" --> CheckVerified{"Is Artist Profile Verified?"}
    
    CheckVerified -- Yes --> PublishInstant["Instant Live on Showcase & Geo-Map"]
    CheckVerified -- No --> AutoFilter["Heuristic Content Scan (Anti-Spam / Quality)"]
    AutoFilter -- Pass --> PublicStage["Published to Community Showcase"]
    AutoFilter -- Flagged --> ModQueue["Held for Curator Approval (Under Review)"]
```

---

### Journey 4: Cultural Festival & Pooram Event Publishing Flow
Publishing temple festivals, percussion lineups (*Melams*), and cultural conventions.

```mermaid
flowchart TD
    Organizer["Festival Organizer / Cultural Center visits /events/create"] --> Login["Authenticate as Verified Organizer / Admin"]
    Login --> BasicInfo["Enter Festival Name (e.g. Arattupuzha Pooram / Machad Mamangam)"]
    BasicInfo --> DateSelect["Select Dates (Dual: Gregorian Calendar + Malayalam Month/Star)"]
    DateSelect --> VenueMap["Pin Festival Grounds on Map (e.g. Thekkinkadu Maidan)"]
    
    VenueMap --> LineupBuilder["Build Program Schedule & Melam Lineup:"]
    LineupBuilder --> ScheduleItems["1. Panchavadyam Lineup (Lead Thimila & Maddalam Masters)<br>2. Ilanjithara Melam (Pandi Melam master & 250 percussionists)<br>3. Kudamattam (Elephant umbrella competition timetable)<br>4. Fireworks (Vedikkettu) Safety Guidelines & Advisories"]
    
    ScheduleItems --> BannerUpload["Upload High-Res Festival Poster & Gallery"]
    BannerUpload --> VisitorAdvisories["Add Dress Code, Parking & Crowd Management Advisories"]
    VisitorAdvisories --> SubmitEvent["Submit Event Schedule"]
    SubmitEvent --> LiveCalendar["Live on Calendar, Search, and Thrissur Map Marker"]
    LiveCalendar --> PushNotifications["Subscribers of this Artform receive 'Pooram Alert'"]
```

---

### Journey 5: Curator & Moderation Review Lifecycle
How cultural administrators safeguard the platform against commercial spam and misrepresentation.

```mermaid
sequenceDiagram
    autonumber
    actor Submitter as Artisan / Contributor
    participant System as Kalakriti Event Bus
    participant Queue as Moderation Queue
    actor Curator as Cultural Board Curator
    participant DB as PostgreSQL
    participant SMS as SMS / Email Gateway

    Submitter->>System: Submits Artist Verification or Flagged Content
    System->>Queue: Enqueues item with automated risk score & timestamps
    Curator->>Queue: Opens Curator Dashboard (/dashboard/curator)
    Queue-->>Curator: Displays pending items sorted by priority
    Curator->>Curator: Inspects submitted artisan credentials (e.g., Kalamandalam certification)
    
    alt Approved
        Curator->>Queue: Selects "Approve & Grant Badge"
        Queue->>DB: Update `artist_profiles.verification_tier = 'VERIFIED_MASTER'`
        Queue->>DB: Log action in `audit_logs`
        System->>SMS: Send congratulatory SMS in Malayalam
    else Needs Clarification
        Curator->>Queue: Selects "Request Additional Documentation"
        Queue->>DB: Update `status = 'NEEDS_REVISION'` with curator remarks
        System->>SMS: Send link for artisan to re-upload proof
    else Rejected
        Curator->>Queue: Selects "Reject (Commercial Spammer / Misrepresentation)"
        Queue->>DB: Update `status = 'REJECTED'` and archive submission
        Queue->>DB: Record IP & reason in `audit_logs`
    end
```

---

## 3. Entity State Machine Lifecycles

### 3.1 Artwork Showcase State Machine

```mermaid
stateDiagram-v2
    [*] --> DRAFT : Creator initializes entry
    DRAFT --> UNDER_REVIEW : Creator clicks "Submit for Curation"
    DRAFT --> [*] : Deleted by creator
    
    UNDER_REVIEW --> PUBLISHED : Approved by curator or auto-verified
    UNDER_REVIEW --> REJECTED : Rejected due to guideline breach
    UNDER_REVIEW --> NEEDS_REVISION : Curator requests higher-res image or craft detail
    
    NEEDS_REVISION --> UNDER_REVIEW : Creator updates metadata
    
    PUBLISHED --> ARCHIVED : Creator unlists or marks as sold
    ARCHIVED --> PUBLISHED : Creator relists item
    
    PUBLISHED --> [*] : Deleted
    REJECTED --> [*] : Deleted
```

### 3.2 Artist Verification Tier State Machine

```mermaid
stateDiagram-v2
    [*] --> UNVERIFIED : User registers mobile account as Artist
    UNVERIFIED --> UNDER_REVIEW : Submits credentials, lineage & studio location
    
    UNDER_REVIEW --> VERIFIED_MASTER : Curator confirms lineage, awards or master rank
    UNDER_REVIEW --> HERITAGE_GUILD : Recognized collective / weaving society
    UNDER_REVIEW --> UNVERIFIED : Rejected / insufficient proof
    
    VERIFIED_MASTER --> SUSPENDED : Violation reported & verified by admin
    SUSPENDED --> VERIFIED_MASTER : Reinstated following review
```

---

## 4. Responsive UI Navigation & Breakpoint Strategy

| Screen Tier | Width | Primary Navigation Paradigm | Map Experience |
| :--- | :--- | :--- | :--- |
| **Mobile (`< 640px`)** | 360px – 639px | Fixed Bottom Navigation Bar (Home, Discover, Map, Saved, Profile) | Split-sheet bottom drawer (peek 25%, drag to 80% to view list) |
| **Tablet (`640px – 1024px`)** | 640px – 1023px | Collapsible Side Drawer + Sticky Top Header with Lang Toggle | 50/50 Dual Pane (Map left, Card feed right) |
| **Desktop (`> 1024px`)** | 1024px – 1920px+ | Persistent Cultural Header with Quick Search, Language Switcher & Profile Dropdown | Full-screen vector canvas with floating filter pill-box |

