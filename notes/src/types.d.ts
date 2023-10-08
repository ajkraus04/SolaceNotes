

export type Note = {
    id: Number,
    note: string,
    created_at: string,
    date_modified: string
}

export type handleAddCardOutput = {
    success: boolean;
    error?: {error: string}
}
