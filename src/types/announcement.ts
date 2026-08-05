export interface Announcement {
    id: string;
    title: string;
    link: string | null;
    display_order: number;
    is_active: boolean;
    created_at: string;
}