# System Design Basics & HR Interview Questions

### Q1: How would you design a scalable online LMS video platform?
**Answer**:
1. **Client**: SPA React frontend using Video.js and chunked progressive buffering.
2. **API Layer**: Node/Express REST API load balanced across multiple Docker containers.
3. **Storage & CDN**: Videos transcoded to HLS/DASH formats stored in AWS S3 and delivered globally via Cloudflare CDN.
4. **Database**: MongoDB for user profiles and course progress; Redis for active session caching and rate-limiting.

### Q2: HR Question — "Tell me about a technical challenge you faced and how you overcame it."
**Answer**: Frame response using STAR technique (Situation, Task, Action, Result). Highlight problem diagnosis using logs, systematic root-cause resolution, team collaboration, and automated verification.
