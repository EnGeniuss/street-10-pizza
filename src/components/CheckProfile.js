'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function checkProfile() {
    const router = useRouter();
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(data);
                setLoading(false);
            });
        })

    }, []);

    return {loading, data};

}