<?php
if (! function_exists('convertDate')) {
    function convertDate($date)
    {
        return  date('d/m/Y H:i:s', strtotime($date));
    }
}
