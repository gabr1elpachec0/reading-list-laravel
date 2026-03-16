<?php

namespace App\Enums;

enum ReadingStatus: string
{
    case Read = 'read';
    case Reading = 'reading';
    case WantToRead = 'want_to_read';
}
