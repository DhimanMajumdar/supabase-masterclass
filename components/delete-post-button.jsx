"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";

export function DeletePostButton({ postId }) {
    const [loading, setLoading] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm("Are you sure you want to delete this post?")) {
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase
                .from("posts")
                .delete()
                .eq("id", postId);

            if (error) throw error;

            router.refresh();
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={loading}
            className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-colors z-20"
        >
            {loading ? <Spinner className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
        </Button>
    );
}
